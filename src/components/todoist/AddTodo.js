import { useState } from 'react';

function AddTodo({addTodo}) {
  
  const [content, setContent] = useState('')

  const handleChange = (e) => setContent(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(content);
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-row pt-4 pl-4 pr-4 pb-0'>
      <div className="flex-1 inline-flex">
      <p className='text-primary text-sm inline-flex items-center'>
      <i className='fas fa-plus mr-2'></i>
          <input
            type='text'
            className='rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none mr-2'
            placeholder='Quick Add Todo'
            onChange={handleChange}
            name='content'
            id='add-todo'
            required
          />
        </p>
        <button
          type='submit'
          className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none'>
          Add
        </button>
      </div>
      </form>
  )
}

export default AddTodo
