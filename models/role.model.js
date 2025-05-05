import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define('Role', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

export default Role