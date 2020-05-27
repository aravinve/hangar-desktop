import React from 'react';

function Keypad(props) {
  return (
    <React.Fragment>
      <div className='columns'></div>
      <div className='columns'>
        <div className='column buttons'>
          <button
            className='button is-medium'
            name='1'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            1
          </button>
          <button
            className='button is-medium'
            name='2'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            2
          </button>
          <button
            className='button is-medium'
            name='3'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            3
          </button>
          <button
            className='button is-medium'
            name='C'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            C
          </button>
        </div>
      </div>
      <div className='columns'>
        <div className='column buttons'>
          <button
            className='button is-medium'
            name='4'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            4
          </button>
          <button
            className='button is-medium'
            name='5'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            5
          </button>
          <button
            className='button is-medium'
            name='6'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            6
          </button>
          <button
            className='button is-medium'
            name='0'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            0
          </button>
        </div>
      </div>
      <div className='columns'>
        <div className='column buttons'>
          <button
            className='button is-medium'
            name='7'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            7
          </button>
          <button
            className='button is-medium'
            name='8'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            8
          </button>
          <button
            className='button is-medium'
            name='9'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            9
          </button>
          <button
            className='button is-medium'
            name='.'
            onClick={(e) => props.buttonClick(e.target.name)}
            style={{ paddingLeft: '1.2em', paddingRight: '1.2em' }}
          >
            .
          </button>
        </div>
      </div>
      <div className='columns'>
        <div className='column is-1'>&nbsp;</div>
        <div className='column is-2'>
          <button className='is-dark button' onClick={props.convert}>
            {' '}
            Convert
          </button>
        </div>
        <div className='column is-1'>&nbsp;</div>
      </div>
    </React.Fragment>
  );
}

export default Keypad;
