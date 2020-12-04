import { useState } from 'react';
import Result from './Result';
import Keypad from './Keypad';
import Dashboard from '../home/Dashboard';
import convert from 'convert-units';
import SidePane from './SidePane';
import ConvertSelect from './ConvertSelect';

function Converter() {
  const [result, setResult] = useState('')
  const [data, setData] = useState('')
  const [fromSelectList, setFromSelectList] = useState('')
  const [toSelectList, setToSelectList] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [convertResult, setConvertResult] = useState('')

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
  }

  const setFromSelectData = (e) => {
    setFromSelectList(e.target.value)
    setConvertResult('')
  }

  const setToSelectData = (e) => {
    setToSelectList(e.target.value)
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
      <div className='container'>
          <div className='columns'>
            <SidePane loadSelectData={loadSelectData} />
            <div
              className='column is-7'
              style={{
                marginTop: '4rem',
                paddingLeft: '4rem',
              }}
            >
              {fromSelectList.length > 0 ? (
                <div className='columns'>
                  <div className='column is-2'>
                    <label htmlFor='from'>From: </label>
                    <div className='select is-small is-dark'>
                      <select
                        id='from'
                        name='from'
                        onChange={setFromSelectData}
                      >
                        {fromList}
                      </select>
                    </div>
                  </div>
                  <div className='column is-2'>
                    <label htmlFor='to'>To: </label>
                    <div className='select is-small is-dark'>
                      <select id='to' name='to' onChange={setToSelectData}>
                        {toList}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
              <Result result={result} />
              <Keypad buttonClick={buttonClick} convert={convertFunction} />
            </div>
            {convertResult !== '' ? (
              <div
                className='column is-3'
                style={{
                  marginTop: '4rem',
                  position: 'fixed',
                  right: '8rem',
                }}
              >
                <div
                  className='box has-background-light '
                  style={{ overflowWrap: 'break-word', textAlign: 'center' }}
                >
                  <h4 className='is-size-2'>Result</h4>
                  <hr className='navbar-divider' />
                  <div className='is-size-5'>
                    {result}
                    {from} = {convertResult}
                    {to}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Converter
