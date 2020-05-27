import React from 'react';

function TodoItem(props) {
  const todoStyle = {
    textDecoration: props.todo.completed ? 'line-through' : 'none',
  };
  return (
    <div className='box has-background-light'>
      <p className='columns is-1'>
        <div className='is-pulled-left column'>
          <input
            type='checkbox'
            onClick={() => props.handleCheckBox(props.todo.id)}
          />
        </div>
        <div className='column is-10 is-size-5' style={todoStyle}>
          {props.todo.title}
        </div>
        <div className='column is-1 is-pulled-right'>
          <button
            className='button is-small'
            onClick={() => props.handleDelete(props.todo.id)}
          >
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </p>
    </div>
  );
}

export default TodoItem;
