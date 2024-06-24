import React, { useState } from 'react';
import api from './api';

const AddComment = ({ taskId }) => {
  const [comment, setComment] = useState('');

  const handleAddComment = async () => {
    try {
      const response = await api.post('/tasks/add-comment', { taskId, comment });
      console.log('Comment added:', response.data);
    } catch (error) {
      console.error('Error adding comment:', error.response.data);
    }
  };

  return (
    <div className="AddComment">
      <input type="text" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default AddComment;