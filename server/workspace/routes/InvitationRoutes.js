import express from 'express';
import invitationController from '../controllers/invitationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST Send invitation
router.post('/send', authMiddleware, invitationController.sendInvitation);

export default router;
