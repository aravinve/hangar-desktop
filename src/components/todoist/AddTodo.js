import { useState } from 'react';

function AddTodo({addTodo, clearAddTerm}) {
  
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
      <div className="inline-flex bg-white items-center justify-center rounded-md shadow-md mr-2">
        <input
            type='text'
            className='text-sm text-primary p-1 rounded-l-md outline-none focus:outline-none'
            placeholder='Quick Add Todo'
            onChange={handleChange}
            name='content'
            id='add-todo'
            required
          />
          <div className="rounded-r-md p-1 bg-gray-400">
            <i className='fas fa-times cursor-pointer text-primary text-xs' onClick={clearAddTerm}></i>
          </div>
      </div>
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
