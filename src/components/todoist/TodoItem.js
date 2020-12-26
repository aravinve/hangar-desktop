import {useState} from 'react'
import TodoDrop from "./TodoDrop"
import moment from 'moment'

function TodoItem({todo, handleCheckBox, handleDelete, handleEdit, editMode, handleCancel, handleSave}) {

  const todoStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  }

  const [todoTitle, setTodoTitle] = useState(todo.title)
  const [todoDeadline, setTodoDeadline] = useState(todo.deadline)
  const [todoImportance, setTodoImportance] = useState(todo.importance)
  const [todoCategory, setTodoCategory] = useState(todo.category)

  const importanceSelectData = [{title: "Highly Important", icon: "fas fa-info-circle text-red-600"}, {title: "Important", icon: "fas fa-info-circle text-primary"}, {title: "Medium", icon: "fas fa-info-circle text-indigo-600"}, {title: "Normal", icon: "fas fa-info-circle text-green-600"}, {title: "Low", icon: "fas fa-info-circle text-gray-600"}]

  const categorySelectData = [{title: "Default" , icon: "fas fa-info-circle text-gray-600"}, {title: "Personal" , icon: "fas fa-home text-primary"}, {title: "Work" , icon: "fas fa-building text-red-600"}, {title: "Study" , icon: "fas fa-school text-indigo-600"}, {title: "Vacation" , icon: "fas fa-plane text-green-600"}]

  return (
    <div className='bg-secondary text-primary shadow-md rounded-md p-4 m-2'>
      <div className='flex flex-row items-center justify-start'>
        {editMode.status && editMode.id===todo.id ? null : (<div className='flex-shrink-0'>
          <input
            type='checkbox'
            className='m-2 rounded-sm w-4 h-4'
            onClick={() => handleCheckBox(todo.id)}
          />
        </div>)}
        {editMode.status && editMode.id===todo.id ? (<div className='flex-1 text-primary text-lg'>
          <input
            type='text'
            className='rounded-sm shadow-md p-2 text-sm text-primary w-full outline-none focus:outline-none'
            placeholder={todo.title}
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
            id='edit-todo'
          />
        </div>) : (<div className='flex-1 text-primary text-xl truncate select-none' style={todoStyle}>
          {todo.title}
        </div>)}
        <div className="flex-1 flex flex-row justify-start pl-2 pt-2 pr-2 pb-1">
        {editMode.status && editMode.id===todo.id ? (<>
            <div className="flex-1 mr-2">
              <input
              type='date'
              onChange={(e) => setTodoDeadline(e.target.value)}
              value={todoDeadline}
              min={moment(new Date()).format("YYYY-MM-DD")}
              className='rounded-sm shadow-md p-2 text-sm text-primary w-full outline-none focus:outline-none' />
            </div>
            <div className="flex-1 mr-2">
              <TodoDrop listItems={categorySelectData} defaultTitle={todoCategory.title} defaultIcon={todoCategory.icon} setValueFunction={setTodoCategory} />
            </div>
            <div className="flex-1 mr-2">
              <TodoDrop listItems={importanceSelectData} defaultTitle={todoImportance.title} defaultIcon={todoImportance.icon} setValueFunction={setTodoImportance} />
            </div>
          </>) : (<>
        <div className="flex-1 text-primary text-sm mt-1 mb-1 select-none">
          <i className='fas fa-calendar-alt mr-2'></i> {todo.deadline}
        </div>
        <div className='flex-1 text-primary text-sm mt-1 mb-1 select-none'>
          <i className={todo.category.icon.toString().concat(' mr-2')}></i> {todo.category.title}
        </div>
        <div className='flex-1 text-primary text-sm mt-1 mb-1 select-none'>
          <i className={todo.importance.icon.toString().concat(' mr-2')}></i> {todo.importance.title}
        </div>
        </>)}
        </div>
        {editMode.status && editMode.id===todo.id ? (<>
          <div className='flex-shrink-0 m-1'>
          <button
            className='cursor-pointer text-primary text-md p-1 rounded-sm focus:outline-none'
            onClick={() => handleSave({id: todo.id, title: todoTitle, deadline: todoDeadline, category: todoCategory, importance: todoImportance, completed: todo.completed})}>
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
