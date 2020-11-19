import React from 'react';

function Keypad(props) {
  return (
    <React.Fragment>
      <div className='columns m-0 is-gapless'>
        <div className='column buttons are-medium'>
          <button
            className='button'
            name='('
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            (
          </button>
          <button
            className='button'
            name=')'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            )
          </button>
          <button
            className='button'
            name='CE'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            CE
          </button>
          <button
            className='button'
            name='C'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            C
          </button>
        </div>
      </div>
      <div className='columns m-0 is-gapless'>
        <div className='column buttons are-medium'>
          <button
            className='button'
            name='1'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            1
          </button>
          <button
            className='button'
            name='2'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            2
          </button>
          <button
            className='button'
            name='3'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            3
          </button>
          <button
            className='button'
            name='+'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            +
          </button>
        </div>
      </div>
      <div className='columns m-0 is-gapless'>
        <div className='column buttons are-medium'>
          <button
            className='button'
            name='4'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            4
          </button>
          <button
            className='button'
            name='5'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            5
          </button>
          <button
            className='button'
            name='6'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            6
          </button>
          <button
            className='button'
            name='-'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            -
          </button>
        </div>
      </div>
      <div className='columns m-0 is-gapless'>
        <div className='column buttons are-medium'>
          <button
            className='button'
            name='7'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            7
          </button>
          <button
            className='button'
            name='8'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            8
          </button>
          <button
            className='button'
            name='9'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            9
          </button>
          <button
            className='button'
            name='*'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            *
          </button>
        </div>
      </div>
      <div className='columns m-0 is-gapless'>
        <div className='column buttons are-medium'>
          <button
            className='button'
            name='.'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            .
          </button>
          <button
            className='button'
            name='0'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            0
          </button>
          <button
            className='button'
            name='='
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            =
          </button>
          <button
            className='button'
            name='/'
            onClick={(e) => props.buttonClick(e.target.name)}
          >
            /
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Keypad;
