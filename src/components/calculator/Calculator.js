import { useState } from 'react';
import Result from './Result';
import Keypad from './Keypad';
import Dashboard from '../home/Dashboard';
import ScientificKeypad from './ScientificKeypad';
import SidePane from './SidePane';

function Calculator() {
  const [result, setResult] = useState('')
  const [message, setMessage] = useState('')
  const [modeChange, setModeChange] = useState('simple')

  const validateLimit = (paramResult) => {
    if(paramResult == undefined || paramResult == "NaN"){
      setResult('Error')
      setMessage('Computation Error!!!')
    } else {
      if(result.length <= 50){
       setResult(paramResult)
      } else{
      setMessage('Calculator Limit Reached!!')
      }
    }
  }

  const calculate = () => {
    try {
      setResult((eval(result) || '') + '')
      setMessage('')
    } catch (error) {
      setResult('Error')
      setMessage('Computation Error!!!')
    }
  }

  const reset = () => {
    setResult('')
    setMessage('')
  }

  const clearLast = () => {
    setResult(result.slice(0, -1))
    setMessage('')
  }

  const handleChange = (e) => {
    setModeChange(e.target.value)
    reset();
  }

  const buttonClick = (name) => {
    if (name === '=') {
      calculate();
    }else if (name === 'C') {
      reset();
    } else if (name === 'CE') {
      clearLast();
    } else if (name === 'sin') {
      validateLimit(Math.sin(result).toString());
    } else if (name === 'cos') {
      validateLimit(Math.cos(result).toString());
    }else if (name === 'tan') {
      validateLimit(Math.tan(result).toString());
    }else if (name === 'sqrt') {
      validateLimit(Math.sqrt(result).toString());
    }else if (name === 'log') {
      validateLimit(Math.log(result).toString() );
    }else if (name === 'square') {
      validateLimit(Math.pow(result, 2).toString());
    }else if (name === 'pi') {
      validateLimit((Math.PI * (result)).toString());
    } else if (name === 'e') {
      validateLimit((Math.E * (result)).toString());
    } else if (name === 'plusminus') {
      validateLimit((-1 * (result)).toString());
    } else {
      validateLimit(result + name);
    }
  }

  return (
    <>
      <div className='container' style={{ marginTop: '4rem' }}>
          <div className='columns'>
            <SidePane handleChange={handleChange} />
            <div className={`${modeChange === 'simple' ? 'column is-3 p-4 mt-4': 'column is-5 p-4 mt-4'}`}>
              <Result result={result} size={modeChange === 'simple' ? '15rem': '23rem'} />
              {modeChange === 'simple' ? (<Keypad buttonClick={buttonClick} />) : (<ScientificKeypad buttonClick={buttonClick} />)}
            </div>
            <div className="column is-2 mt-6">
              {message !== ''? (<div className='has-text-danger is-size-3'>{message} </div>) : (
                <div>&nbsp;</div>
              )}
            </div>
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Calculator