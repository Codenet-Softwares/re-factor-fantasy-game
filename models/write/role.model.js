import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Role = write_db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        timestamps: true,
    }
)

export default Role