import mongoose from 'mongoose';

const WorkspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}]
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);
export default Workspace;
