import React, { Component } from 'react';
import Result from './Result';
import Keypad from './Keypad';
import Dashboard from '../home/Dashboard';

class Calculator extends Component {
  state = {
    result: '',
  };
  buttonClick = (name) => {
    if (name === '=') {
      this.calucluate();
    } else if (name === 'C') {
      this.reset();
    } else if (name === 'CE') {
      this.clearLast();
    } else {
      this.setState({ result: this.state.result + name });
    }
  };
  calucluate = () => {
    try {
      this.setState({ result: (eval(this.state.result) || '') + '' });
    } catch (error) {
      this.setState({ result: 'error' });
    }
  };

  reset = () => {
    this.setState({ result: '' });
  };
  clearLast = () => {
    this.setState({ result: this.state.result.slice(0, -1) });
  };
  render() {
    return (
      <React.Fragment>
        <div className='container' style={{ marginTop: '4rem' }}>
          <div className='columns'>
            <div className='column'>
              <h2 className='is-title'>Calculator</h2>
            </div>
            <div className='column'>
              <Result result={this.state.result} />
              <Keypad buttonClick={this.buttonClick} />
            </div>
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Calculator;
