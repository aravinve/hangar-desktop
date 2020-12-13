import  { useState } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import { v4 as uuid } from 'uuid';
import TodoItem from './TodoItem';

function Todoist() {

  const dummyTodo = {
    id: uuid(),
    title: 'Write essay',
    completed: false,
  }

  const [todos, setTodos] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTodos, setFilterTodos] = useState([])
  const [alert, setAlert] = useState('')

  const handleCheckBox = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }))
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setFilterTodos(filterTodos.filter((todo) => todo.id !== id))
  }

  const addTodo = (content) => {
    const newContent =  {
      id: uuid(),
      title: content,
      completed: false,
    }
    setTodos([...todos, newContent])
    setFilterTodos([])
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value === '') {
      setFilterTodos([])
    }
  }

  const searchTodo = () => {
    const filteredTodo = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm)
    );
    if (filteredTodo.length === 0) {
      setAlert('Not Found')
    } else {
      setAlert('')
    }
    setFilterTodos(filteredTodo)
  }

  const todosList = todos.length > 0 ? todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
        />
      ))
    : null

const filteredTodoList = filterTodos.length > 0 ? filterTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
        />
      ))
    : null

  return (
    <>
      <div className='flex flex-row mt-40 mb-24 px-4 py-6 justify-center'>
          <SidePane
            addTodo={addTodo}
            searchTodo={searchTodo}
            handleChange={handleChange}
            alert={alert}
          />
          <div
            className='flex-auto mt-4 p-4'>
            {filteredTodoList !== null ? filteredTodoList : todosList}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Todoist
