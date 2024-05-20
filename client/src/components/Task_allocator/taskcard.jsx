import React from 'react';

const TaskCard = ({ task, onUpdateTask }) => {
  const handleStatusChange = (e) => {
    onUpdateTask(task._id, { status: e.target.value });
  };

  return (
    <div className="task-card">
      <h3>{task.heading}</h3>
      <p>{task.description}</p>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="to-do">To-Do</option>
        <option value="in-progress">In-Progress</option>
        <option value="done">Done</option>
      </select>
      <p>Assigned to: {task.assignee}</p>
      {task.comments && <p>Comments: {task.comments}</p>}
    </div>
  );
};

export default TaskCard;
