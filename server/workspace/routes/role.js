import express from 'express';
import roleController from '../controllers/roleController.js';
import authMiddleware from '../middleware/authMiddleware.js';
 

const router = express.Router();

// POST Create new role
router.post('/create', authMiddleware, roleController.createRole);

// GET Get roles by workspace ID
router.get('/:workspaceId', authMiddleware, roleController.getRolesByWorkspace);

// GET Invitation link by role ID
router.get('/invite/:roleId', authMiddleware, roleController.getInvitationLink);

export default router;
