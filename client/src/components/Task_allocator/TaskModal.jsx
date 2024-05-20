import React, { useState } from 'react';
import api from './api';

const TaskModal = ({ onClose, onCreateTask }) => {
  const [task, setTask] = useState({
    heading: '',
    description: '',
    assignee: '',
    comments: '', // State for comments
    attachment: '' // State for attachment
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCreate = async () => {
    await onCreateTask(task);
    onClose();
  };

  const handleCommentChange = (e) => {
    setTask({ ...task, comments: e.target.value });
  };

  const handleAttachmentChange = (e) => {
    setTask({ ...task, attachment: e.target.files[0] });
  };

  const handleAddComment = async () => {
    if (task.comments.trim() !== '') {
      await api.post(`/tasks/${task._id}/comments`, { comment: task.comments });
      setTask({ ...task, comments: '' });
    }
  };

  const handleAddAttachment = async () => {
    const formData = new FormData();
    formData.append('attachment', task.attachment);
    await api.post(`/tasks/${task._id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setTask({ ...task, attachment: '' });
  };

  return (
    <div className="modal">
      <h2>Create Task</h2>
      <input name="heading" placeholder="Heading" value={task.heading} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <input name="assignee" placeholder="Assignee" value={task.assignee} onChange={handleChange} />
      <textarea placeholder="Comments" value={task.comments} onChange={handleCommentChange}></textarea>
      <button onClick={handleAddComment}>Add Comment</button>
      <input type="file" name="attachment" onChange={handleAttachmentChange} />
      <button onClick={handleAddAttachment}>Add Attachment</button>
      <button onClick={handleCreate}>Create</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskModal;
