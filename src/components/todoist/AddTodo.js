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
    <form onSubmit={handleSubmit} className='panel-block'>
        <p className='control has-icons-left'>
          <input
            type='text'
            className='input is-small'
            placeholder='Add Todo'
            onChange={handleChange}
            name='content'
            id='add-todo'
          />
          <span className='icon is-left'>
            <i className='fas fa-plus'></i>
          </span>
        </p>
        <button
          type='submit'
          className='button is-small is-dark'
          style={{ marginLeft: '0.5rem' }}
        >
          Add
        </button>
      </form>
  )
}

export default AddTodo
