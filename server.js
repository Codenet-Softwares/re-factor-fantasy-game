import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { write_db, read_db } from './config/database.js';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env' });
}

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = process.env.FRONTEND_URI.split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.send('Production environment is running.');
    } else {
        res.send('Development environment is running.');
    }
});

Promise.all([
    write_db.sync({ alter: true }),
    read_db.sync({ alter: true })
])
    .then(() => {
        console.log('✅ Databases & tables synced!');
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`🚀 App running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('❌ Error syncing DBs:', err);
    });

process.on('SIGINT', async () => {
    await sequelize.close();
    process.exit(0);
});