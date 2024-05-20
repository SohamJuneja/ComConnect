import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    channels: [{ name: { type: String, required: true } }]
});

const Role = mongoose.model('Role', RoleSchema);
export default Role;
