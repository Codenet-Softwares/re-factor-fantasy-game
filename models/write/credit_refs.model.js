import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Credit_Refs = write_db.define('Credit_Refs', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credit_refs: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: [],
    },
},
    {
        timestamps: true,
    }
)

export default Credit_Refs