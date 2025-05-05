import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Partnerships = write_db.define('Partnerships', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partnerships: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: [],
    },
},
    {
        timestamps: true,
    }
)

export default Partnerships