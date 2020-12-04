import AddTodo from './AddTodo';

function SidePane({addTodo, handleChange, searchTodo, alert}) {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Todoist</p>
        <AddTodo addTodo={addTodo} />
        <div className='panel-block'>
          <p className='control has-icons-left'>
            <input
              className='input is-small'
              type='text'
              name='searchTerm'
              placeholder='Search'
              onChange={handleChange}
            />
            <span className='icon is-left'>
              <i className='fas fa-search'></i>
            </span>
          </p>
          <button
            className='button is-small is-dark'
            style={{ marginLeft: '0.5rem' }}
            onClick={searchTodo}
          >
            Search
          </button>
        </div>
        {alert !== '' ? (
          <div className='panel-block'>{alert} </div>
        ) : null}
      </nav>
    </div>
  );
}

export default SidePane;
