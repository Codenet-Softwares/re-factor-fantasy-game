import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Role = write_db.define('Role', {
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