import React, { useState } from 'react';

const TaskModal = ({ onClose, onCreateTask }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = () => {
    onCreateTask({ heading, description, assigneeEmail, workspaceId, attachments });
    onClose();
  };

  return (
    <div className="TaskModal">
      <h2>Create Task</h2>
      <input type="text" placeholder="Heading" value={heading} onChange={(e) => setHeading(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="email" placeholder="Assignee Email" value={assigneeEmail} onChange={(e) => setAssigneeEmail(e.target.value)} />
      <input type="text" placeholder="Workspace ID" value={workspaceId} onChange={(e) => setWorkspaceId(e.target.value)} />
      <input type="file" multiple onChange={(e) => setAttachments(Array.from(e.target.files))} />
      <button onClick={handleSubmit}>Create</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskModal;