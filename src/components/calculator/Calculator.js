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
      <div className='flex flex-col items-center mt-8 px-4 py-6 justify-center'>
          <SidePane handleChange={handleChange} />
          <div className='flex-auto px-12 py-10'>
            {message !== ''? (<div className='text-red-600 select-none text-lg'>{message} </div>) : (
              <div>&nbsp;</div>
            )}
          </div>
          <div className='flex-auto px-12 py-10'>
            <Result result={result} />
            {modeChange === 'simple' ? (<Keypad buttonClick={buttonClick} />) : (<ScientificKeypad buttonClick={buttonClick} />)}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Calculator