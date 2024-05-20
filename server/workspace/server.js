import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS module

import authRoutes from './routes/auth.js';
import workspaceRoutes from './routes/workspace.js';
import roleRoutes from './routes/role.js';
import invitationRoutes from './routes/InvitationRoutes.js';


import dotenv from "dotenv";
import Connection from './config/db.js';

const app = express();
dotenv.config();

// Connect to database
const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

// Middleware
app.use(cors()); // Use CORS middleware to allow all origins
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/invitations', invitationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));