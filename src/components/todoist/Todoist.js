import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import { v4 as uuid } from 'uuid';
import TodoItem from './TodoItem';

class Todoist extends Component {
  state = {
    todos: [
      {
        id: uuid(),
        title: 'Write essay',
        completed: false,
      },
    ],
    searchTerm: '',
    filteredTodos: [],
    alert: '',
  };

  handleCheckBox = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
      filteredTodos: this.state.filteredTodos.filter((todo) => todo.id !== id),
    });
  };

  addTodo = (content) => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          title: content,
          completed: false,
        },
      ],
      filteredTodos: [],
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === '') {
      this.setState({ filteredTodos: [] });
    }
  };
  searchTodo = () => {
    const filteredTodo = this.state.todos.filter((todo) =>
      todo.title.toLowerCase().includes(this.state.searchTerm)
    );
    if (filteredTodo.length === 0) {
      this.setState({ alert: 'Not Found' });
    } else {
      this.setState({ alert: '' });
    }
    this.setState({ filteredTodos: filteredTodo });
  };

  render() {
    const todosList =
      this.state.todos.length > 0
        ? this.state.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={this.handleDelete}
              handleCheckBox={this.handleCheckBox}
            />
          ))
        : null;
    const filteredTodoList =
      this.state.filteredTodos.length > 0
        ? this.state.filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={this.handleDelete}
              handleCheckBox={this.handleCheckBox}
            />
          ))
        : null;
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            addTodo={this.addTodo}
            searchTodo={this.searchTodo}
            handleChange={this.handleChange}
            alert={this.state.alert}
          />
          <div
            className='column is-9'
            style={{ marginTop: '4rem', padding: '4rem' }}
          >
            {filteredTodoList !== null ? filteredTodoList : todosList}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Todoist;
