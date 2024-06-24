import React from 'react';
import TaskCard from './taskcard';
 

const TaskColumn = ({ status, tasks, onUpdateTask }) => {
  return (
    <div className="task-column">
      <h2>{status.toUpperCase()}</h2>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} onUpdateTask={onUpdateTask} />
      ))}
    </div>
  );
};

export default TaskColumn;
