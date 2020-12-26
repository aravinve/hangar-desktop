import { useState } from 'react';
import Result from './Result';
import Keypad from './Keypad';
import Dashboard from '../home/Dashboard';
import convert from 'convert-units';
import SidePane from './SidePane';
import ConvertSelect from './ConvertSelect';

function Converter() {
  const [result, setResult] = useState('')
  const [fromSelectList, setFromSelectList] = useState('')
  const [toSelectList, setToSelectList] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [convertResult, setConvertResult] = useState('')
  const [showKeypad, setShowKeypad] = useState(false)

  const buttonClick = (name) => {
    if (name === 'C') {
      reset();
    } else if (name === 'CE') {
      clearLast();
    } else {
      setResult(result + name)
      setConvertResult('')
    }
  }

  const convertFunction = () => {
    if (from !== '' && to !== '') {
      const convertedResult = convert(result)
        .from(from)
        .to(to);
        setConvertResult(convertedResult)
    } else {
      setConvertResult('ERROR')
    }
  }

  const reset = () => {
    setResult('')
    setConvertResult('')
  }

  const clearLast = () => {
    setResult(result.slice(0, -1))
    setConvertResult('')
  }

  const loadSelectData = (e) => {
    const selectData = convert().possibilities(e.target.value);
    setFromSelectList(selectData)
    setToSelectList(selectData)
    setFrom(selectData[0])
    setTo(selectData[0])
    setConvertResult('')
    setShowKeypad(true)
  }

  const setFromSelectData = (e) => {
    setFrom(e.target.value)
    setConvertResult('')
  }

  const setToSelectData = (e) => {
    setTo(e.target.value)
    setConvertResult('')
  }

  const fromList =
  fromSelectList.length > 0
    ? fromSelectList.map((unit) => (
        <ConvertSelect key={unit} unit={unit} />
      ))
    : null

const toList =
  toSelectList.length > 0
    ? toSelectList.map((unit) => (
        <ConvertSelect key={unit} unit={unit} />
      ))
    : null

  return (
    <>
     <div className='flex flex-col items-center bg-white px-4 py-6 justify-center'>
            <SidePane loadSelectData={loadSelectData} />
            <div className='flex-auto bg-secondary px-8 pt-10 pb-4 rounded-md shadow-lg mt-1 mb-1'>
              {fromSelectList.length > 0 ? (
                <div className='flex flex-row flex-1 items-center justify-center'>
                  <div className='flex-1 m-2'>
                    <div className='inline-flex items-center m-1'>
                    <label className='text-primary mr-2' htmlFor='from'>From: </label>
                      <select
                        id='from'
                        name='from'
                        className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
                        onChange={setFromSelectData}
                      >
                        {fromList}
                      </select>
                    </div>
                  </div>
                  <div className='flex-1 m-2'>
                    <div className='inline-flex items-center m-1'>
                    <label className='text-primary mr-2' htmlFor='to'>To: </label>
                      <select id='to' name='to'
                       className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none" onChange={setToSelectData}>
                        {toList}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
            {showKeypad ? (<> <Result result={result} />
              <Keypad buttonClick={buttonClick} convert={convertFunction} />
              </>) : null}
            </div>
            {convertResult !== '' ? (
              <div
                className='flex-auto mt-1 mb-1'>
                <div
                  className='bg-primary text-secondary py-4 px-16 text-lg text-center select-none rounded-sm shadow-sm' style={{ overflowWrap: 'break-word' }}>
                  <h4 className='text-secondary text-xl select-none'>Result</h4>
                  <div className='text-secondary text-lg mt-4'>
                    {result}
                    {from} = {convertResult}
                    {to}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        <Dashboard />
    </>
  )
}

export default Converter
