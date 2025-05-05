import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Permission = sequelize.define('Permission', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Permission