import React from 'react';
import AddTodo from './AddTodo';

function SidePane(props) {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Todoist</p>
        <AddTodo addTodo={props.addTodo} />
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input is-small'
              type='text'
              name='searchTerm'
              placeholder='Search'
              onChange={props.handleChange}
            />
            <span className='icon is-left'>
              <i className='fas fa-search'></i>
            </span>
          </p>
          <button
            className='button is-small is-dark'
            style={{ marginLeft: '0.5rem' }}
            onClick={props.searchTodo}
          >
            Search
          </button>
        </div>
        {props.alert !== '' ? (
          <div className='panel-block'>{props.alert} </div>
        ) : null}
      </nav>
    </div>
  );
}

export default SidePane;
