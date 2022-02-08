import React, { useState } from 'react';
import './AddTask.css';

const AddTask = ({ add }) => {
  const minDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(minDate);
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleCheckBox = (e) => {
    setChecked(e.target.checked);
  };

  const handleClick = () => {
    if (text.length > 2) {
      const addTask = add(text, date, checked);
      if (addTask) {
        setText('');
        setDate(minDate);
        setChecked(false);
      }
    } else {
      alert('za krótka nazwa ');
    }
  };

  let maxDate = minDate.slice(0, 4) * 1 + 1;
  maxDate = maxDate + '-12-31';
  return (
    <div className='form'>
      <input
        onChange={handleText}
        type='text'
        placeholder='dodaj zadanie'
        value={text}
      />
      <input
        onChange={handleCheckBox}
        type='checkbox'
        checked={checked}
        id='important'
      />
      <label htmlFor='important'>Priorytet</label>
      <br />
      <label htmlFor='date'>Do kiedy zrobić</label>
      <input
        type='date'
        value={date}
        min={minDate}
        max={maxDate}
        onChange={handleDate}
      />
      <br />
      <button onClick={handleClick}>Dodaj</button>
    </div>
  );
};

export default AddTask;
