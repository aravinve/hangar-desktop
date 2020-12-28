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
  const [filterTitle, setFilterTitle] = useState('')
  const [filterIcon, setFilterIcon] = useState('')
  const [showFilters, setShowFilters] = useState(false)

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
      resetDateFilter()
      resetCategoryFilter()
      resetImportanceFilter()
    }
  }

  const focusAddTodo = () => {
    addTodo('New Todo')
    if(document.getElementById('add-todo') !== undefined){
      document.getElementById('add-todo').focus()
    }
  }

  const defaultTodoComponent = (
    <div className='flex flex-col items-center justify-center text-3xl text-primary select-none m-1 p-1'> <div>
      <i className='fas fa-tasks mr-2'></i> All Todos Catched Up
    </div>
    <div className="cursor-pointer text-sm underline mt-4" onClick={focusAddTodo}>
    <i className='fas fa-plus mr-2'></i>
      Add Now
    </div>
    </div>)

  const defaultFilterTodoComponent = 
  alert !== '' ? (
    <div className='flex flex-col items-center justify-center text-3xl text-primary select-none m-1 p-1'> <div>
    <i className='fas fa-exclamation-triangle mr-2'></i> {alert}
  </div>
  <div className="cursor-pointer text-sm underline mt-4" onClick={() => {
     if(document.getElementById('search-filter-todo') !== null){
      document.getElementById('search-filter-todo').value = ''
    }
    setFilterTodos([])
    setFilterTitle('')
  }}>
  <i className='fas fa-ban mr-2'></i>
    Clear Search Keyword
  </div>
  </div>
  )
  :( 
  <div className='flex flex-col items-center justify-center text-3xl text-primary select-none m-1 p-1'> <div>
    <i className='fas fa-filter mr-2'></i> No Todo Available In This Filter
  </div>
  <div className="cursor-pointer text-sm underline mt-4" onClick={() => {
    resetCategoryFilter()
    resetDateFilter()
    resetImportanceFilter()
  }}>
  <i className='fas fa-ban mr-2'></i>
    Clear Filters
  </div>
  </div>)

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value === '') {
      setFilterTodos([])
      setAlert('')
    }
  }

  const searchTodo = () => {
    resetCategoryFilter()
    resetDateFilter()
    resetImportanceFilter()
    const filteredTodo = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm)
    );
    if (filteredTodo.length === 0) {
      setAlert(searchTerm.concat(' not found'))
    } else {
      setAlert('')
    }
    if(document.getElementById('search-filter-todo') !== null){
      document.getElementById('search-filter-todo').value = ''
    }
    setFilterTodos(filteredTodo)
    setFilterIcon('fas fa-search text-primary')
    setFilterTitle(searchTerm)
  }

  const handleSelectChange = (e) => {

    const performFilterByDate = () => {
      resetImportanceFilter()
      resetCategoryFilter()
      setFilterIcon('fas fa-calendar-alt text-primary')
      if(e.target.value === "today"){
        const todayTodoList = todos.length > 0 ? todos.filter(todo => checkValidToday(todo.deadline)) : []
        setFilterTodos(todayTodoList)
        setFilterTitle('Today')
      } else if(e.target.value === "next"){
        const nextSevenDaysTodoList = todos.length > 0 ? todos.filter(todo => checkValidNextSeven(todo.deadline)).sort((a,b) => new Date(a.deadline) - new Date(b.deadline)) : []
        setFilterTodos(nextSevenDaysTodoList)
        setFilterTitle('Next 7 Days')
      } else if(e.target.value === "past"){
        const pastTodoList = todos.length > 0 ? todos.filter(todo => checkPastDates(todo.deadline)).sort((a,b) => new Date(b.deadline) - new Date(a.deadline)) : []
        setFilterTodos(pastTodoList)
        setFilterTitle('Archived')
      } else if(e.target.value === "future"){
        const futureTodoList = todos.length > 0 ? todos.filter(todo => checkFutureDates(todo.deadline)).sort((a,b) => new Date(b.deadline) - new Date(a.deadline)) : []
        setFilterTodos(futureTodoList)
        setFilterTitle('Upcoming')
      } else {
        if(document.getElementById('todo-filter-by-date') !== null) {
          document.getElementById('todo-filter-by-date').selectedIndex = 0
        }
      }
    }

    const performFilterByCategory= () => {
      resetDateFilter()
      resetImportanceFilter()
      if(e.target.value === "default"){
        const defaultTodoList = todos.length > 0 ? todos.filter(todo => todo.category.title === "Default") : []
        setFilterTodos(defaultTodoList)
        setFilterTitle('Default')
        setFilterIcon('fas fa-info-circle text-gray-600')
      } else if(e.target.value === "home"){
        const homeTodoList = todos.length > 0 ? todos.filter(todo => todo.category.title === "Personal") : []
        setFilterTodos(homeTodoList)
        setFilterTitle('Personal')
        setFilterIcon('fas fa-home text-primary')
      } else if(e.target.value === "work"){
        const workTodoList = todos.length > 0 ? todos.filter(todo => todo.category.title === "Work") : []
        setFilterTodos(workTodoList)
        setFilterTitle('Work')
        setFilterIcon('fas fa-building text-red-600')
      } else if(e.target.value === "study"){
        const studyTodoList = todos.length > 0 ? todos.filter(todo => todo.category.title === "Study") : []
        setFilterTodos(studyTodoList)
        setFilterTitle('Study')
        setFilterIcon('fas fa-school text-indigo-600')
      } else if(e.target.value === "travel"){
        const travelTodoList = todos.length > 0 ? todos.filter(todo => todo.category.title === "Travel") : []
        setFilterTodos(travelTodoList)
        setFilterTitle('Travel')
        setFilterIcon('fas fa-plane text-green-600')
      } else {
        if(document.getElementById('todo-filter-by-category') !== null) {
          setFilterTitle('')
          setFilterTodos([])
          document.getElementById('todo-filter-by-category').selectedIndex = 0
        }
      }
    }

    const performFilterByImportance = () => {
      resetCategoryFilter()
      resetDateFilter()
      if(e.target.value === "high"){
        const highImpTodoList = todos.length > 0 ? todos.filter(todo => todo.importance.title === "Urgent") : []
        setFilterTodos(highImpTodoList)
        setFilterTitle('Urgent')
        setFilterIcon('fas fa-info-circle text-red-600')
      } else if(e.target.value === "imp"){
        const importantTodoList = todos.length > 0 ? todos.filter(todo => todo.importance.title === "Important") : []
        setFilterTodos(importantTodoList)
        setFilterTitle('Important')
        setFilterIcon('fas fa-info-circle text-primary')
      } else if(e.target.value === "med"){
        const mediumTodoList = todos.length > 0 ? todos.filter(todo => todo.importance.title === "Medium") : []
        setFilterTodos(mediumTodoList)
        setFilterTitle('Medium')
        setFilterIcon('fas fa-info-circle text-indigo-600')
      } else if(e.target.value === "nor"){
        const normalTodoList = todos.length > 0 ? todos.filter(todo => todo.importance.title === "Normal") : []
        setFilterTodos(normalTodoList)
        setFilterTitle('Normal')
        setFilterIcon('fas fa-info-circle text-green-600')
      } else if(e.target.value === "low"){
        const lowTodoList = todos.length > 0 ? todos.filter(todo => todo.importance.title === "Low") : []
        setFilterTodos(lowTodoList)
        setFilterTitle('Low')
        setFilterIcon('fas fa-info-circle text-gray-600')
      } else {
        if(document.getElementById('todo-filter-by-importance') !== null) {
          setFilterTitle('')
          setFilterTodos([])
          document.getElementById('todo-filter-by-importance').selectedIndex = 0
        }
      }
    }

    const selectName = e.target.name
    setAlert('')
    switch(selectName) {
      case "filterByDate":
        performFilterByDate()
        break
      case "filterByCategory":
        performFilterByCategory()
        break
      case "filterByImportance":
        performFilterByImportance()
        break
      default:
        break
    }
   
  }

  const resetDateFilter = () => {
    if(document.getElementById('todo-filter-by-date') !== null) {
      document.getElementById('todo-filter-by-date').selectedIndex = 0
    }
    setFilterTodos([])
    setFilterTitle('')
  }

  const resetImportanceFilter = () => {
    if(document.getElementById('todo-filter-by-importance') !== null) {
      document.getElementById('todo-filter-by-importance').selectedIndex = 0
    }
    setFilterTodos([])
    setFilterTitle('')
  }

  const resetCategoryFilter = () => {
    if(document.getElementById('todo-filter-by-category') !== null) {
      document.getElementById('todo-filter-by-category').selectedIndex = 0
    }
    setFilterTodos([])
    setFilterTitle('')
  }

  const resetAllFilters = () => {
    setShowFilters(!showFilters)
    resetDateFilter()
    resetImportanceFilter()
    resetCategoryFilter()
  }

  const checkValidToday = (date) => {
    const today = moment(new Date()).format("YYYY-MM-DD")
    if(moment(date).diff(today, 'days') === 0){
      return true
    } else {
      return false
    }
  }

  const checkValidNextSeven = (date) => {
    const today = moment(new Date()).format("YYYY-MM-DD")
    if(moment(date).diff(today, 'days') <= 7 && moment(date).diff(today, 'days') >= 0){
      return true
    } else {
      return false
    }
  }

  const checkPastDates = (date) => {
    const today = moment(new Date()).format("YYYY-MM-DD")
    if(moment(date).diff(today, 'days') < 0){
      return true
    } else {
      return false
    }
  }

  const checkFutureDates = (date) => {
    const today = moment(new Date()).format("YYYY-MM-DD")
    console.log(date, today)
    console.log(moment(date).diff(today, 'days'))
    if(moment(date).diff(today, 'days') > 7){
      return true
    } else {
      return false
    }
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
    : (defaultTodoComponent)

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
    : filterTitle !== '' && filterTodos.length === 0 ? defaultFilterTodoComponent : null

  return (
    <>
      <div className='flex flex-row mt-40 mb-24 px-4 py-6 justify-center'>
          <SidePane
            addTodo={addTodo}
            searchTodo={searchTodo}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            resetAllFilters={resetAllFilters}
            resetDateFilter={resetDateFilter}
            resetCategoryFilter={resetCategoryFilter}
            resetImportanceFilter={resetImportanceFilter}
            showFilters={showFilters}
          />
          <div className="flex-auto flex flex-col justify-center mt-12 p-4">
            {filterTitle !== '' ? (<div className="flex-auto text-2xl mb-4">
            <i className={filterIcon.concat(' mr-2')}></i>
            <span className='text-primary'>{filterTitle}</span>
          </div>) : null}
            <div className='flex-auto p-2'>
              {filteredTodoList !== null ? filteredTodoList : todosList}
            </div>
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Todoist
