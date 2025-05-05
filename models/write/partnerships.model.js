import { DataTypes } from "sequelize";
import { write_db } from "../../config/database.js";

const Partnerships = write_db.define('Partnerships', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partnership: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: true,
    }
)

export default Partnerships