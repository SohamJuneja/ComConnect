import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  assignee: { type: String, required: true },
  status: { type: String, default: 'to-do' },
  comments: { type: [String], default: [] }, // Array of comments
  attachments: { type: [String], default: [] } // Array of attachment URLs
});

export default mongoose.model('Task', taskSchema);
