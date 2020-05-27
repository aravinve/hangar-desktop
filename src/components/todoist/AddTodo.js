import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.content);
    document.getElementById('add-todo').value = '';
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='panel-block'>
        <p className='control has-icons-left'>
          <input
            type='text'
            className='input is-small'
            placeholder='Add Todo'
            onChange={this.handleChange}
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
    );
  }
}

export default AddTodo;
