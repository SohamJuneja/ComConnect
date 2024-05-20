import React, { useState, useEffect } from 'react';
 
import api from './api';
import TaskBoard from './taskboard';
import TaskModal from './TaskModal';
  

function Task() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await api.get('/tasks');
      setTasks(result.data);
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (task) => {
    const result = await api.post('/tasks', task);
    setTasks([...tasks, result.data]);
  };

  const handleUpdateTask = async (id, updates) => {
    const result = await api.put(`/tasks/${id}`, updates);
    setTasks(tasks.map(task => task._id === id ? result.data : task));
  };

  return (
    <div className="Task">
      <TaskBoard tasks={tasks} onUpdateTask={handleUpdateTask} />
      <button onClick={() => setModalOpen(true)}>Create Task</button>
      {modalOpen && <TaskModal onClose={() => setModalOpen(false)} onCreateTask={handleCreateTask} />}
    </div>
  );
}

export default Task;
