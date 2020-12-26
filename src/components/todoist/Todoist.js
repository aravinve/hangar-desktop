import  { useState } from 'react'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import { v4 as uuid } from 'uuid'
import TodoItem from './TodoItem'
import moment from 'moment'

function Todoist() {

  const [todos, setTodos] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTodos, setFilterTodos] = useState([])
  const [alert, setAlert] = useState('')
  const [editMode, setEditMode] = useState({status: false, id: null})

  const handleCheckBox = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo
    }))
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setFilterTodos(filterTodos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (id) => {
    setEditMode({
      status: true,
      id: id
    })
  }

  const handleSave = async ({id, title, importance, category, deadline, completed}) => {
    
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        todo.title = title
        todo.deadline = moment(deadline).format("YYYY-MM-DD")
        todo.completed = completed
        todo.category = category
        todo.importance = importance
      }
      return todo
    }))
    setEditMode({
      status: false,
      id: null
    })
  }

  const handleCancel = (id) => {
    setEditMode({
      status: false,
      id: null
    })
  }

  const addTodo = (content) => {
    if(content !== ''){
      const today = new Date()
      const categoryDefault = {
        title: 'Default',
        icon: 'fas fa-info-circle text-gray-600',
      }
      const importanceDefault = {
        title: 'Important',
        icon: 'fas fa-info-circle text-primary',
      }
      const newContent =  {
        id: uuid(),
        title: content,
        deadline: moment(today).format("YYYY-MM-DD"),
        completed: false,
        category: categoryDefault,
        importance: importanceDefault
      }
      setTodos([...todos, newContent])
      setFilterTodos([])
      if(document.getElementById('add-todo') !== undefined){
        document.getElementById('add-todo').value = ''
      }
    }
  }

  const focusAddTodo = () => {
    addTodo('New Todo')
    if(document.getElementById('add-todo') !== undefined){
      document.getElementById('add-todo').focus()
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value === '') {
      setFilterTodos([])
      setAlert('')
    }
  }

  const searchTodo = () => {
    const filteredTodo = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm)
    );
    if (filteredTodo.length === 0) {
      setAlert(searchTerm.concat(' not found'))
    } else {
      setAlert('')
    }
    setFilterTodos(filteredTodo)
  }

  const todosList = todos.length > 0 ? todos.map((todo) => (
        <>
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            handleCheckBox={handleCheckBox}
            handleEdit={handleEdit}
            editMode={editMode}
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        </>
      ))
    : (<div className='flex flex-col items-center justify-center text-3xl text-primary select-none m-1 p-1'> <div>
      <i className='fas fa-tasks mr-2'></i> All Todos Catched Up
    </div>
    <div className="cursor-pointer text-sm underline mt-4" onClick={focusAddTodo}>
    <i className='fas fa-plus mr-2'></i>
      Add Now
    </div>
    </div>)

const filteredTodoList = filterTodos.length > 0 ? filterTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
          handleEdit={handleEdit}
          editMode={editMode}
          handleCancel={handleCancel}
          handleSave={handleSave}
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
            className='flex-auto mt-8 p-4'>
            {filteredTodoList !== null ? filteredTodoList : todosList}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Todoist
