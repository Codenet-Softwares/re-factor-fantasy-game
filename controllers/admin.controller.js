
export const createAdmin = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const user = req.user;
      const { userName, password, roles } = req.body;
      const checkRolesMap = {
        [string.superAdmin]: [
          string.whiteLabel,
          string.superAgent,
          string.hyperAgent,
          string.masterAgent,
        ],
        [string.whiteLabel]: [
          string.superAgent,
          string.hyperAgent,
          string.masterAgent,
          string.user,
        ],
        [string.superAgent]: [
          string.hyperAgent,
          string.masterAgent,
          string.user,
        ],
        [string.hyperAgent]: [
          string.masterAgent,
          string.user,
        ],
        [string.masterAgent]: [string.user],
      };
  
      const allowedRoles = checkRolesMap[user.roles[0].role] || [];
  
      const isValidRole = roles.every((role) => allowedRoles.includes(role));
      if (!isValidRole) {
        return res.status(statusCode.forbidden).send(
          apiResponseErr(null, false, statusCode.forbidden, "You are not authorized to create one or more of the specified roles.")
        );
      }
      const isUserRole = roles.includes(string.user)
      const [existingAdmin, existingTrashUser] = await Promise.all([
        admins.findOne({ where: { userName } }),
        trash.findOne({ where: { userName } }),
      ]);
  
      if (existingAdmin || existingTrashUser) {
        const errorMessage = isUserRole ? messages.userExists : messages.adminExists;
        throw apiResponseErr(null, false, statusCode.exist, errorMessage);
      }
  
      if (user.isActive === false) {
        throw apiResponseErr(null, false, statusCode.badRequest, "Account is inactive");
      }
  
      if (user.locked === false) {
        throw apiResponseErr(null, false, statusCode.unauthorize, "Account is locked");
      }
  
      const defaultPermission = ['all-access'];
      const rolesWithDefaultPermission = roles.map((role) => ({
        role,
        permission: defaultPermission,
      }));
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAdmin = await admins.create({
        adminId: uuid4(),
        userName,
        password: hashedPassword,
        roles: rolesWithDefaultPermission,
        createdById: user.adminId,
        createdByUser: user.userName,
      }, { transaction });
  
      const token = jwt.sign({ roles: req.user.roles }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
      let message = '';
      if (isUserRole) {
        const dataToSend = {
          userId: newAdmin.adminId,
          userName,
          password,
        };
  
        try {
          const baseUrl = process.env.COLOR_GAME_URL;
  
          const response = await axios.post(`${baseUrl}/api/user-create`, dataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.data.success) {
            throw new Error('Failed to create user');
          } else {
            message = 'successfully';
          }
        } catch (error) {
          console.error("Error from API:", error.response ? error.response.data : error.message);
          throw new Error('Failed to create user in external system');
        }
      }
  
      const isSubRole = [
        string.subWhiteLabel,
        string.subAdmin,
        string.subHyperAgent,
        string.subSuperAgent,
        string.subMasterAgent,
      ].includes(user.roles[0].role);
  
      if (isSubRole) {
        await newAdmin.update({ createdById: user.createdById || user.adminId }, { transaction });
      }
      if (user.adminId) {
        await calculateLoadBalance(user.adminId, transaction);
      }
  
      await transaction.commit();
      const successMessage = isUserRole ? 'User created' : 'Admin created successfully';
  
      return res.status(statusCode.create).send(apiResponseSuccess(null, true, statusCode.create, successMessage + " " + message));
    } catch (error) {
      console.error("Error during creation:", error.message);
      await transaction.rollback();
      return res
        .status(statusCode.internalServerError)
        .send(apiResponseErr(null, false, statusCode.internalServerError, error.errMessage));
    };
  }