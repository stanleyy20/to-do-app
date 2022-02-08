import React from 'react';
import Task from './Task';

const TaskList = (props) => {
  const active = props.tasks.filter((task) => task.active === true);
  const done = props.tasks.filter((task) => task.active === false);

  if (done.length >= 2) {
    done.sort((a, b) => {
      if (a.finishDate < b.finishDate) return 1;
      if (a.finishDate > b.finishDate) return -1;
      return 0;
    });
  }

  if (active.length >= 2) {
    active.sort((a, b) => {
      a = a.text.toLowerCase();
      b = b.text.toLowerCase();

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  const activeTasks = active.map((task) => (
    <Task
      key={task.id}
      task={task}
      delete={props.delete}
      change={props.change}
    />
  ));

  const doneTasks = done.map((task) => (
    <Task
      key={task.id}
      task={task}
      delete={props.delete}
      change={props.change}
    />
  ));

  return (
    <React.Fragment>
      <div className='active'>
        {<h1>Lista zadania do zrobienia</h1>}
        {activeTasks.length > 0 ? (
          activeTasks
        ) : (
          <p>Nie masz zadań do zrobienia </p>
        )}
      </div>

      <div className='done'>
        <h3>Wykonane zadania ({done.length})</h3>
        {doneTasks.length > 5 && (
          <span style={{ fontSize: 10 }}>
            wyświtlonych jest jedynie 5 ostatnich elementów
          </span>
        )}
        {doneTasks.slice(0, 5)}
      </div>
    </React.Fragment>
  );
};

export default TaskList;
