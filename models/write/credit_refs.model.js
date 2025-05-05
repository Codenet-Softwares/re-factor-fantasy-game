import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Credit_Refs = write_db.define('Credit_Refs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credit_ref: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
    },
},
    {
        timestamps: true,
    }
)

export default Credit_Refs


