import React from 'react';

const style = {
  color: 'red',
};

const Task = (props) => {
  const { text, date, id, active, important, finishDate } = props.task;

  const changeTaskStatus = () => props.change(id);
  const deleteTask = () => props.delete(id);

  if (active) {
    return (
      <div>
        <p>
          <strong style={important ? style : null}>{text}</strong> - do{' '}
          <span>{date} </span>
          <button onClick={changeTaskStatus}>Zostało zrobione</button>
          <button onClick={deleteTask}>X</button>
        </p>
      </div>
    );
  } else {
    const finishTime = new Date(finishDate).toLocaleString();
    return (
      <div>
        <p>
          <strong>{text}</strong> <em>(zrobić do {date}</em>) <br />
          <span style={{ fontSize: 13 }}>
            - potwierdzenie wykonanania {finishTime}{' '}
          </span>
          <button onClick={deleteTask}>X</button>
        </p>
      </div>
    );
  }
};

export default Task;
