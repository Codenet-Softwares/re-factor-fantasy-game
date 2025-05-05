import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

export const write_db = new Sequelize(
    process.env.WRITE_DB_NAME,
    process.env.WRITE_DB_USER,
    process.env.WRITE_DB_PASS,
    {
        host: process.env.WRITE_DB_HOST,
        dialect: process.env.WRITE_DB_DIALECT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

export const read_db = new Sequelize(
    process.env.READ_DB_NAME,
    process.env.READ_DB_USER,
    process.env.READ_DB_PASS,
    {
        host: process.env.READ_DB_HOST,
        dialect: process.env.READ_DB_DIALECT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

(async () => {
    try {
        await write_db.authenticate();
        console.log('✅ Write DB connected');

        await read_db.authenticate();
        console.log('✅ Read DB connected');
    } catch (err) {
        console.error('❌ DB connection error:', err);
    }
})();

