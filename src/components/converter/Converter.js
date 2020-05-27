import React, { Component } from 'react';
import Result from './Result';
import Keypad from './Keypad';
import Dashboard from '../home/Dashboard';
import convert from 'convert-units';
import SidePane from './SidePane';
import ConvertSelect from './ConvertSelect';

class Converter extends Component {
  state = {
    result: '',
    data: '',
    fromSelectList: '',
    toSelectList: '',
    from: '',
    to: '',
    convertResult: '',
  };
  buttonClick = (name) => {
    if (name === 'C') {
      this.reset();
    } else if (name === 'CE') {
      this.clearLast();
    } else {
      this.setState({ result: this.state.result + name, convertResult: '' });
    }
  };
  convert = () => {
    if (this.state.from !== '' && this.state.to !== '') {
      const convertResult = convert(this.state.result)
        .from(this.state.from)
        .to(this.state.to);
      this.setState({ convertResult: convertResult });
    } else {
      this.setState({ convertResult: 'ERROR' });
    }
  };
  reset = () => {
    this.setState({ result: '', convertResult: '' });
  };
  clearLast = () => {
    this.setState({
      result: this.state.result.slice(0, -1),
      convertResult: '',
    });
  };

  loadSelectData = (e) => {
    const selectData = convert().possibilities(e.target.value);
    this.setState({
      fromSelectList: selectData,
      toSelectList: selectData,
      from: selectData[0],
      to: selectData[0],
      convertResult: '',
    });
  };

  setSelectData = (e) => {
    this.setState({ [e.target.name]: e.target.value, convertResult: '' });
  };

  render() {
    const fromList =
      this.state.fromSelectList.length > 0
        ? this.state.fromSelectList.map((unit) => (
            <ConvertSelect key={unit} unit={unit} />
          ))
        : null;
    const toList =
      this.state.toSelectList.length > 0
        ? this.state.toSelectList.map((unit) => (
            <ConvertSelect key={unit} unit={unit} />
          ))
        : null;
    return (
      <React.Fragment>
        <div className='container'>
          <div className='columns'>
            <SidePane loadSelectData={this.loadSelectData} />
            <div
              className='column is-6'
              style={{
                marginTop: '4rem',
                paddingLeft: '4rem',
              }}
            >
              {this.state.fromSelectList.length > 0 ? (
                <div className='columns'>
                  <div className='column is-2'>
                    <label htmlFor='from'>From: </label>
                    <div className='select is-small is-dark'>
                      <select
                        id='from'
                        name='from'
                        onChange={this.setSelectData}
                      >
                        {fromList}
                      </select>
                    </div>
                  </div>
                  <div className='column is-2'>
                    <label htmlFor='to'>To: </label>
                    <div className='select is-small is-dark'>
                      <select id='to' name='to' onChange={this.setSelectData}>
                        {toList}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              <Result result={this.state.result} />
              <Keypad buttonClick={this.buttonClick} convert={this.convert} />
            </div>
            {this.state.convertResult !== '' ? (
              <div
                className='column is-3'
                style={{
                  marginTop: '4rem',
                }}
              >
                <div
                  className='box has-background-light '
                  style={{ overflowWrap: 'break-word' }}
                >
                  <div className='content is-size-5'>
                    {this.state.result}
                    {this.state.from} = {this.state.convertResult}
                    {this.state.to}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Converter;
