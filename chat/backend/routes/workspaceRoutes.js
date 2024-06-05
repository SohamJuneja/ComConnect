const express = require('express');
const { createWorkspace, addRole, inviteToRole, joinWorkspace, getRoles } = require('../controllers/workspaceControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createWorkspace);
router.route('/:id/role').post(protect, addRole);
router.route('/:id/invite').post(protect, inviteToRole);
router.get('/:id/roles',protect,getRoles);

router.post('/join', protect, joinWorkspace);

module.exports = router;
