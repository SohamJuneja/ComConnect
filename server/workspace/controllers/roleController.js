import Role from '../models/Role.js';

const createRole = async (req, res) => {
    try {
        const { workspaceId, name } = req.body;
        const role = new Role({ workspace: workspaceId, name });
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const getRolesByWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const roles = await Role.find({ workspace: workspaceId });
        res.json(roles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const getInvitationLink = async (req, res) => {
    try {
        const { roleId } = req.params;
        // Implement invitation link logic
        res.json({ invitationLink: 'INVITATION_LINK_HERE' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

export default { createRole, getRolesByWorkspace, getInvitationLink };
