import React from 'react';

const TaskBoard = ({ tasks, onUpdateTask }) => {
  const handleStatusChange = (task, status) => {
    onUpdateTask(task._id, { status });
  };

  return (
    <div className="TaskBoard">
      {['to-do', 'in-progress', 'done'].map(status => (
        <div key={status} className="TaskColumn">
          <h2>{status}</h2>
          {tasks.filter(task => task.status === status).map(task => (
            <div key={task._id} className="TaskCard">
              <h3>{task.heading}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleStatusChange(task, 'to-do')}>To-Do</button>
              <button onClick={() => handleStatusChange(task, 'in-progress')}>In Progress</button>
              <button onClick={() => handleStatusChange(task, 'done')}>Done</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;