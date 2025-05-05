import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

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

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created!');
        app.listen(process.env.PORT, () => {
            console.log(`App is running on  - http://localhost:${process.env.PORT || 8000}`);
        });


    })
    .catch(err => {
        console.error('Unable to create tables:', err);
    });

process.on('SIGINT', async () => {
    await sequelize.close();
    process.exit(0);
});