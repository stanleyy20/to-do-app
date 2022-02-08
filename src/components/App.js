import React, { useState } from 'react';

import AddTask from './AddTask';
import TaskList from './TaskList';

import './App.css';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [tasks, setTasks] = useState([]);

  const deleteTask = (id) => {
    let tasksToDelete = [...tasks];
    tasksToDelete = tasksToDelete.filter((task) => task.id !== id);
    setTasks(tasksToDelete);
  };

  const changeTaskStatus = (id) => {
    const taskToChangeStatus = Array.from(tasks);
    taskToChangeStatus.forEach((task) => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
    });
    setTasks(taskToChangeStatus);
  };

  const addTask = (text, date, important) => {
    const task = {
      id: counter,
      text: text,
      date: date,
      important: important,
      active: true,
      finishDate: null,
    };
    setCounter(counter + 1);
    setTasks((prev) => [...prev, task]);
    return true;
  };

  return (
    <div className='App'>
      <h1>To Do App</h1>
      <AddTask add={addTask} />
      <TaskList tasks={tasks} delete={deleteTask} change={changeTaskStatus} />
    </div>
  );
};

export default App;
