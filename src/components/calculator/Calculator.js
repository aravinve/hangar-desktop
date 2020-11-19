import React, { Component } from 'react';
import Result from './Result';
import Keypad from './Keypad';
import Dashboard from '../home/Dashboard';
import ScientificKeypad from './ScientificKeypad';
import SidePane from './SidePane';

class Calculator extends Component {
  state = {
    result: '',
    message: '',
    modeChange: 'simple'
  };
  buttonClick = (name) => {
    if (name === '=') {
      this.calculate();
    }else if (name === 'C') {
      this.reset();
    } else if (name === 'CE') {
      this.clearLast();
    } else if (name === 'sin') {
      this.validateLimit(Math.sin(this.state.result).toString());
    } else if (name === 'cos') {
      this.validateLimit(Math.cos(this.state.result).toString());
    }else if (name === 'tan') {
      this.validateLimit(Math.tan(this.state.result).toString());
    }else if (name === 'sqrt') {
      this.validateLimit(Math.sqrt(this.state.result).toString());
    }else if (name === 'log') {
      this.validateLimit(Math.log(this.state.result).toString() );
    }else if (name === 'square') {
      this.validateLimit(Math.pow(this.state.result, 2).toString());
    }else if (name === 'pi') {
      this.validateLimit((Math.PI * (this.state.result)).toString());
    } else if (name === 'e') {
      this.validateLimit((Math.E * (this.state.result)).toString());
    } else if (name === 'plusminus') {
      this.validateLimit((-1 * (this.state.result)).toString());
    } else {
      this.validateLimit(this.state.result + name);
    }
  };
  validateLimit = (paramResult) => {
    if(paramResult == undefined || paramResult == "NaN"){
      this.setState({ result: 'Error', message: 'Computation Error!!!' });
    } else {
      if(this.state.result.length <= 50){
        this.setState({ result: paramResult , message: ''});
      } else{
        this.setState({message: 'Calculator Limit Reached!!!'})
      }
    }
  }
  calculate = () => {
    try {
      this.setState({ result: (eval(this.state.result) || '') + '', message: '' });
    } catch (error) {
      this.setState({ result: 'Error', message: 'Computation Error!!!' });
    }
  };
  reset = () => {
    this.setState({ result: '', message: '' });
  };
  clearLast = () => {
    this.setState({ result: this.state.result.slice(0, -1), message: '' });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.reset();
  };
  render() {
    return (
      <React.Fragment>
        <div className='container' style={{ marginTop: '4rem' }}>
          <div className='columns'>
            <SidePane handleChange={this.handleChange} />
            <div className={`${this.state.modeChange === 'simple' ? 'column is-3 p-4 mt-4': 'column is-5 p-4 mt-4'}`}>
              <Result result={this.state.result} size={this.state.modeChange === 'simple' ? '15rem': '23rem'} />
              {this.state.modeChange === 'simple' ? (<Keypad buttonClick={this.buttonClick} />) : (<ScientificKeypad buttonClick={this.buttonClick} />)}
            </div>
            <div className="column is-2 mt-6">
              {this.state.message !== ''? (<div className='has-text-danger is-size-3'>{this.state.message} </div>) : (
                <div>&nbsp;</div>
              )}
            </div>
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Calculator;
