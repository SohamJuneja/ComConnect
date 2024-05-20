import express from 'express';
import workspaceController from '../controllers/workspaceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST Create new workspace
router.post('/create', authMiddleware, workspaceController.createWorkspace);

// POST Join workspace
router.post('/join', authMiddleware, workspaceController.joinWorkspace);

// GET Get all workspaces
router.get('/', authMiddleware, workspaceController.getWorkspaces);

export default router;
