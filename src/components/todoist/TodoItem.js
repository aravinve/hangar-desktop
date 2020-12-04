function TodoItem({todo, handleCheckBox, handleDelete}) {
  const todoStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };
  return (
    <div className='box has-background-light'>
      <p className='columns is-1'>
        <div className='is-pulled-left column'>
          <input
            type='checkbox'
            onClick={() => handleCheckBox(todo.id)}
          />
        </div>
        <div className='column is-10 is-size-5' style={todoStyle}>
          {todo.title}
        </div>
        <div className='column is-1 is-pulled-right'>
          <button
            className='button is-small'
            onClick={() => handleDelete(todo.id)}
          >
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </p>
    </div>
  );
}

export default TodoItem
