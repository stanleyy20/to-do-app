import React, { useContext, useEffect, useState } from 'react';

import AddTask from './AddTask';
import TaskList from './TaskList';
import { StoreContext } from '../stores/StoreProvider';
import { DatabaseManagerEventName } from '../helpers/DatabaseMenager.ts';

import './App.css';

const App = () => {
  const { database } = useContext(StoreContext);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    window.addEventListener(DatabaseManagerEventName, () => {
      database.getAllObjects('todo', (task) => setTasks(task));
      database.getAllObjects('done', (task) => setDoneTasks(task));
    });
  }, [database]);

  const deleteTask = (id) => {
    let tasksToDelete = [...tasks];
    tasksToDelete = tasksToDelete.filter((task) => task.id !== id);
    database.deleteObject('todo', id);
    database.deleteObject('done', id);
    setTasks(tasksToDelete);
    database.getAllObjects('done', (task) => setDoneTasks(task));
  };

  const changeTaskStatus = (id) => {
    const taskToChangeStatus = Array.from(tasks);
    taskToChangeStatus.forEach((task) => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
        database.createObject('done', task);
      }
    });
    database.deleteObject('todo', id);
    database.getAllObjects('done', (task) => setDoneTasks(task));
  };

  const addTask = (text, date, important) => {
    const task = {
      id: Date.now(),
      text: text,
      date: date,
      important: important,
      active: true,
      finishDate: null,
    };
    database.createObject('todo', task);
    setTasks((prev) => [...prev, task]);
    return true;
  };

  return (
    <div className='App'>
      <h1>To Do App</h1>
      <AddTask add={addTask} />
      <TaskList tasks={tasks} doneTasks={doneTasks} delete={deleteTask} change={changeTaskStatus} />
    </div>
  );
};

export default App;
