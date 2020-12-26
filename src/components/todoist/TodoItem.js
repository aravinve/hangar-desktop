function TodoItem({todo, handleCheckBox, handleDelete, handleEdit, editMode, handleCancel, handleSave}) {
  const todoStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };
  return (
    <div className='bg-secondary text-primary shadow-md rounded-md p-4 m-2'>
      <div className='flex flex-row items-center justify-start'>
        {editMode.status && editMode.id===todo.id ? null : (<div className='flex-shrink-0'>
          <input
            type='checkbox'
            className='m-2 rounded-sm'
            onClick={() => handleCheckBox(todo.id)}
          />
        </div>)}
        {editMode.status && editMode.id===todo.id ? (<div className='flex-1 text-primary text-lg'>
          <input
            type='text'
            className='rounded-md shadow-md p-2 text-sm text-primary w-full outline-none focus:outline-none'
            placeholder={todo.title}
            id='edit-todo'
            required
          />
        </div>) : (<div className='flex-1 text-primary text-xl truncate' style={todoStyle}>
          {todo.title}
        </div>)}
        <div className="flex-auto flex flex-row justify-start pl-2 pt-2 pr-2 pb-1">
        {editMode.status && editMode.id===todo.id ? (<>
            <div className="flex-1 mr-2">
              <input
              type='date'
              className='rounded-md shadow-md p-1 text-sm text-primary w-full outline-none focus:outline-none' />
            </div>
            <div className="flex-1 mr-2">
              <select className="rounded-md w-full shadow-md p-1 text-sm text-primary outline-none focus:outline-none">
                <option value='us'>Filter Country Based</option>
                <option value='us'>USA</option>
                <option value='in'>India</option>
                <option value='au'>Australia</option>
                <option value='sg'>Singapore</option>
              </select>
            </div>
            <div className="flex-1 mr-2">
            <select className="rounded-md w-full shadow-md p-1 text-sm text-primary outline-none focus:outline-none">
                <option value='us'>Filter Country Based</option>
                <option value='us'>USA</option>
                <option value='in'>India</option>
                <option value='au'>Australia</option>
                <option value='sg'>Singapore</option>
              </select>
            </div>
          </>) : (<>
        <div className="flex-1 text-primary text-sm mt-1 mb-1">
          <i className='fas fa-calendar-alt mr-1'></i> {todo.deadline}
        </div>
        <div className={`flex-1 text-${todo.color !== 'primary' ? todo.color.concat('-600'): todo.color} text-sm mt-1 mb-1`}>
          <i className='fas fa-th-large mr-1'></i> {todo.project}
        </div></>)}
        </div>
        {editMode.status && editMode.id===todo.id ? (<>
          <div className='flex-shrink-0 m-1'>
          <button
            className='cursor-pointer text-primary text-md p-1 rounded-sm focus:outline-none'
            onClick={() => handleSave(todo.id)}>
            <i className='fas fa-save'></i>
          </button>
        </div>
        <div className='flex-shrink-0 m-1'>
          <button
            className='cursor-pointer text-primary text-md p-1 rounded-sm focus:outline-none'
            onClick={() => handleCancel(todo.id)}>
            <i className='fas fa-times'></i>
          </button>
        </div>
        </>) : (<div className='flex-shrink-0 m-1'>
          <button
            className='cursor-pointer text-primary text-md p-1 rounded-sm focus:outline-none'
            onClick={() => handleEdit(todo.id)}>
            <i className='fas fa-edit'></i>
          </button>
        </div>)}
        <div className='flex-shrink-0 m-1'>
          <button
            className='cursor-pointer text-primary text-md p-1 rounded-sm focus:outline-none'
            onClick={() => handleDelete(todo.id)}>
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem
