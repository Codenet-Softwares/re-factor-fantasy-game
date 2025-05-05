import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Permission = write_db.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
},
    {
        timestamps: true,
    }
)

export default Permission