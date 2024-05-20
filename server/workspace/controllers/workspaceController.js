import User from '../models/User.js';
import Workspace from '../models/Workspace.js';

const createWorkspace = async (req, res) => {
    try {
        const { workspaceName, personName  } = req.body;
        console.log(personName)
        console.log(workspaceName)
         // Assuming userId is extracted from authenticated user

        const workspace = new Workspace({ name: workspaceName, owner: req.user._id });
        await workspace.save();
        res.status(201).json(workspace);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const joinWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.body;
        const userId = req.user._id; // Assuming req.user is set by authentication middleware

        // Check if the workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        // Check if the user is already a member of the workspace
        if (workspace.members.includes(userId)) {
            return res.status(400).json({ message: 'User already a member of this workspace' });
        }

        // Add user to the workspace members
        workspace.members.push(userId);
        await workspace.save();

        // Add workspace to the user's list of workspaces
        const user = await User.findById(userId);
        if (!user.workspaces.includes(workspaceId)) {
            user.workspaces.push(workspaceId);
            await user.save();
        }

        res.json({ message: 'Workspace joined successfully' });
    } catch (error) {
        console.error('Error joining workspace:', error.message);
        res.status(500).send('Server Error');
    }
};

export const getWorkspaces = async (req, res) => {
    try {
        // Assuming `req.user` contains the authenticated user's info, typically set by authentication middleware
        const userId = req.user._id;
        const workspaces = await Workspace.find({ members: userId });
        res.json(workspaces);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve workspaces', error: error.message });
    }
};

export default { createWorkspace, joinWorkspace, getWorkspaces };
