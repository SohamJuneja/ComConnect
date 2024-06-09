const express = require('express');
const { createWorkspace, addRole, inviteToRole, joinWorkspace, getRoles, getUserWorkspaces, getGroups, deleteAllWorkspaces } = require('../controllers/workspaceControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createWorkspace);
router.route('/:id/role').post(protect, addRole);
router.route('/:id/invite').post(protect, inviteToRole);
router.get('/:id/roles',protect,getRoles);

router.post('/join', protect, joinWorkspace);
router.route('/user').get(protect, getUserWorkspaces);
router.get('/:id/groups', getGroups);

router.delete('/deleteAll', deleteAllWorkspaces);

module.exports = router;
