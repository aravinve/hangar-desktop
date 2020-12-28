import  { useState, useEffect } from 'react'
import firebase from '../../firebase'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import TodoItem from './TodoItem'
import moment from 'moment'
import Loader from '../../Loader'

function Todoist() {

  const [todos, setTodos] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTodos, setFilterTodos] = useState([])
  const [alert, setAlert] = useState('')
  const [editMode, setEditMode] = useState({status: false, id: null})
  const [filterTitle, setFilterTitle] = useState('')
  const [filterIcon, setFilterIcon] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.firestore().collection('todoist').onSnapshot(serverUpdate => {
      const todosFromStore = serverUpdate.docs.map(doc => {
        const data = doc.data()
        data['id'] = doc.id
        return data
      })
      if(todosFromStore.length > 0){
        setTodos(todosFromStore)
        setLoading(false)
      } else {
        setTodos('')
        setLoading(false)
      }
    })
  }, [])

  const handleCheckBox = (id, checkState) => {
    firebase.firestore().collection('todoist').doc(id).update({
      completed: !checkState
    })
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  const handleDelete = async (id) => {
    await setTodos(todos.filter((todo) => todo.id !== id))
    await setFilterTodos(filterTodos.filter((todo) => todo.id !== id))
    await firebase.firestore().collection('todoist').doc(id).delete()
  }

  const handleEdit = (id) => {
    setEditMode({
      status: true,
      id: id
    })
  }

  const handleSave = async ({id, title, importance, category, deadline, completed}) => {
    firebase.firestore().collection('todoist').doc(id).update({
      title: title,
      importance: importance,
      category: category,
      deadline: moment(deadline).format("YYYY-MM-DD"),
      completed: completed
    })
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
    resetAllFilters()
  }

  const handleCancel = (id) => {
    setEditMode({
      status: false,
      id: null
    })
    console.log("Save Cancelled For Id:", id)
  }

  const addTodo = async (content) => {
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
        title: content,
        deadline: moment(today).format("YYYY-MM-DD"),
        completed: false,
        category: categoryDefault,
        importance: importanceDefault
      }
      await firebase.firestore().collection('todoist').add({
        title: newContent.title,
        deadline: newContent.deadline,
        completed: newContent.completed,
        category: {
          title: newContent.category.title,
          icon: newContent.category.icon
        },
        importance: {
          title: newContent.importance.title,
          icon: newContent.importance.icon
        },
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      await setTodos([...todos, newContent])
      await setFilterTodos([])
      clearAddTerm()
      resetSearchInputDisable()
      resetAllFilters()
    }
  }

  const resetSearchInputDisable = () => {
    if(document.getElementById('search-filter-todo') !== null){
      document.getElementById('search-filter-todo').disabled = false
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
      document.getElementById('search-filter-todo').disabled = false
      document.getElementById('search-filter-todo').value = ''
    }
    setFilterTodos([])
    setFilterTitle('')
    resetAllFilters()
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
    resetAllFilters()
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
    const targetTodoArray = filterTitle !== '' ? filterTodos : todos
    const filteredTodo = targetTodoArray.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm)
    )
    if (filteredTodo.length === 0) {
      setAlert(searchTerm.concat(' not found'))
      setFilterIcon('fas fa-search text-primary')
      setFilterTitle(searchTerm)
      if(document.getElementById('search-filter-todo') !== null){
        document.getElementById('search-filter-todo').disabled = true
      }
    } else {
      setAlert('')
    }
    setFilterTodos(filteredTodo)
  }

  const handleSelectChange = (e) => {

    const performFilterByDate = () => {
      resetImportanceFilter()
      resetCategoryFilter()
      const targetTodoArray = todos
      const targetValue = e.target.value
      setFilterIcon('fas fa-calendar-alt text-primary')
      if(targetValue === "today"){
        const todayTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => checkValidToday(todo.deadline)) : []
        setFilterTodos(todayTodoList)
        setFilterTitle('Today')
      } else if(targetValue === "next"){
        const nextSevenDaysTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => checkValidNextSeven(todo.deadline)).sort((a,b) => new Date(a.deadline) - new Date(b.deadline)) : []
        setFilterTodos(nextSevenDaysTodoList)
        setFilterTitle('Next 7 Days')
      } else if(targetValue === "past"){
        const pastTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => checkPastDates(todo.deadline)).sort((a,b) => new Date(b.deadline) - new Date(a.deadline)) : []
        setFilterTodos(pastTodoList)
        setFilterTitle('Archived')
      } else if(targetValue === "future"){
        const futureTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => checkFutureDates(todo.deadline)).sort((a,b) => new Date(a.deadline) - new Date(b.deadline)) : []
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
      const targetTodoArray = todos
      const targetValue = e.target.value
      if(targetValue === "default"){
        const defaultTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.category.title === "Default") : []
        setFilterTodos(defaultTodoList)
        setFilterTitle('Default')
        setFilterIcon('fas fa-info-circle text-gray-600')
      } else if(targetValue === "home"){
        const homeTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.category.title === "Personal") : []
        setFilterTodos(homeTodoList)
        setFilterTitle('Personal')
        setFilterIcon('fas fa-home text-primary')
      } else if(targetValue === "work"){
        const workTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.category.title === "Work") : []
        setFilterTodos(workTodoList)
        setFilterTitle('Work')
        setFilterIcon('fas fa-building text-red-600')
      } else if(targetValue === "study"){
        const studyTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.category.title === "Study") : []
        setFilterTodos(studyTodoList)
        setFilterTitle('Study')
        setFilterIcon('fas fa-school text-indigo-600')
      } else if(targetValue === "travel"){
        const travelTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.category.title === "Travel") : []
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
      const targetTodoArray = todos
      const targetValue = e.target.value
      if(targetValue === "high"){
        const highImpTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.importance.title === "Urgent") : []
        setFilterTodos(highImpTodoList)
        setFilterTitle('Urgent')
        setFilterIcon('fas fa-info-circle text-red-600')
      } else if(targetValue === "imp"){
        const importantTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.importance.title === "Important") : []
        setFilterTodos(importantTodoList)
        setFilterTitle('Important')
        setFilterIcon('fas fa-info-circle text-primary')
      } else if(targetValue === "med"){
        const mediumTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.importance.title === "Medium") : []
        setFilterTodos(mediumTodoList)
        setFilterTitle('Medium')
        setFilterIcon('fas fa-info-circle text-indigo-600')
      } else if(targetValue === "nor"){
        const normalTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.importance.title === "Normal") : []
        setFilterTodos(normalTodoList)
        setFilterTitle('Normal')
        setFilterIcon('fas fa-info-circle text-green-600')
      } else if(targetValue === "low"){
        const lowTodoList = targetTodoArray.length > 0 ? targetTodoArray.filter(todo => todo.importance.title === "Low") : []
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

  const modifyPaneState = () => {
    setShowFilters(!showFilters)
    resetAllFilters()
    clearAddTerm()
    clearSearchTerm()
  }

  const resetAllFilters = () => {
    resetDateFilter()
    resetImportanceFilter()
    resetCategoryFilter()
  }

  const clearAddTerm = () => {
    if(document.getElementById('add-todo') !== null){
      document.getElementById('add-todo').value = ''
    }
    resetSearchInputDisable()
  }

  const clearSearchTerm = () => {
    if(document.getElementById('search-filter-todo') !== null){
      document.getElementById('search-filter-todo').value = ''
    }
    resetSearchInputDisable()
    setFilterTitle('')
    setFilterTodos([])
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
            modifyPaneState={modifyPaneState}
            resetDateFilter={resetDateFilter}
            resetCategoryFilter={resetCategoryFilter}
            resetImportanceFilter={resetImportanceFilter}
            showFilters={showFilters}
            clearSearchTerm={clearSearchTerm}
            clearAddTerm={clearAddTerm}
          />
          {!loading ? (<div className="flex-auto flex flex-col justify-center mt-12 p-4">
            {filterTitle !== '' ? (<div className="flex-auto inline-flex items-center text-2xl mb-4 select-none">
            <i className={filterIcon.concat(' mr-2')}></i>
            <span className='text-primary mr-2'>{filterTitle}</span>
            <span className="text-secondary rounded-sm py-1 px-3 bg-primary text-sm text-center">{filteredTodoList !== null ? filterTodos.length : todos.length}</span>
          </div>) : null}
            <div className='flex-auto p-2'>
              {filteredTodoList !== null ? filteredTodoList : todosList}
            </div>
          </div>) : <Loader />}
        </div>
        <Dashboard />
    </>
  )
}

export default Todoist
