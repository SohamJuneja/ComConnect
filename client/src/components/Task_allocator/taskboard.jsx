import React from 'react';
import TaskColumn from './taskcolumn';
 

const TaskBoard = ({ tasks, onUpdateTask }) => {
  const columns = ['to-do', 'in-progress', 'done'];

  return (
    <div className="task-board">
      {columns.map(status => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
