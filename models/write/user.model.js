import { DataTypes, INTEGER } from "sequelize";
import { write_db } from "../../config/database.js";

const User = write_db.define('User', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_login_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    timezone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_by_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    hyper_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    master_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    super_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    white_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    subHyper_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    subAdmin_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    subMaster_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    subSuper_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    subWhite_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    check_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    login_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_reset: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    token: {
        type: DataTypes.STRING,
    },
    eligibility_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        timestamps: true,
    }
)

export default User;