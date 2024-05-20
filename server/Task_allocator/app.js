import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes.js';
import Connection from './db/db.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.use('/api/tasks', taskRoutes);
 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




