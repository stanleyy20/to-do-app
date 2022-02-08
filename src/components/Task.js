import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import './Task.css';

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
          <button className='addButton' onClick={changeTaskStatus}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
          <button className='deleteButton' onClick={deleteTask}>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
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
          <button className='deleteButton' onClick={deleteTask}>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </p>
      </div>
    );
  }
};

export default Task;
