function TodoItem({todo, handleCheckBox, handleDelete}) {
  const todoStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };
  return (
    <div className='bg-secondary text-primary shadow-md rounded-md p-4 m-2'>
      <p className='flex flex-row justify-start'>
        <div className='flex-shrink-0'>
          <input
            type='checkbox'
            className='m-2 rounded-sm'
            onClick={() => handleCheckBox(todo.id)}
          />
        </div>
        <div className='flex-auto text-primary' style={todoStyle}>
          {todo.title}
        </div>
        <div className='flex-shrink-0'>
          <button
            className='cursor-pointer text-primary text-sm p-1 rounded-sm focus:outline-none'
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
