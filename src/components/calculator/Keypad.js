function Keypad({buttonClick}) {
  return (
    <>
      <div className='columns m-0 is-gapless'>
        <div className='column buttons are-medium'>
          <button
            className='button'
            name='('
            onClick={(e) => buttonClick(e.target.name)}
          >
            (
          </button>
          <button
            className='button'
            name=')'
            onClick={(e) => buttonClick(e.target.name)}
          >
            )
          </button>
          <button
            className='button'
            name='CE'
            onClick={(e) => buttonClick(e.target.name)}
          >
            CE
          </button>
          <button
            className='button'
            name='C'
            onClick={(e) => buttonClick(e.target.name)}
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
            onClick={(e) => buttonClick(e.target.name)}
          >
            1
          </button>
          <button
            className='button'
            name='2'
            onClick={(e) => buttonClick(e.target.name)}
          >
            2
          </button>
          <button
            className='button'
            name='3'
            onClick={(e) => buttonClick(e.target.name)}
          >
            3
          </button>
          <button
            className='button'
            name='+'
            onClick={(e) => buttonClick(e.target.name)}
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
            onClick={(e) => buttonClick(e.target.name)}
          >
            4
          </button>
          <button
            className='button'
            name='5'
            onClick={(e) => buttonClick(e.target.name)}
          >
            5
          </button>
          <button
            className='button'
            name='6'
            onClick={(e) => buttonClick(e.target.name)}
          >
            6
          </button>
          <button
            className='button'
            name='-'
            onClick={(e) => buttonClick(e.target.name)}
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
            onClick={(e) => buttonClick(e.target.name)}
          >
            7
          </button>
          <button
            className='button'
            name='8'
            onClick={(e) => buttonClick(e.target.name)}
          >
            8
          </button>
          <button
            className='button'
            name='9'
            onClick={(e) => buttonClick(e.target.name)}
          >
            9
          </button>
          <button
            className='button'
            name='*'
            onClick={(e) => buttonClick(e.target.name)}
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
            onClick={(e) => buttonClick(e.target.name)}
          >
            .
          </button>
          <button
            className='button'
            name='0'
            onClick={(e) => buttonClick(e.target.name)}
          >
            0
          </button>
          <button
            className='button'
            name='='
            onClick={(e) => buttonClick(e.target.name)}
          >
            =
          </button>
          <button
            className='button'
            name='/'
            onClick={(e) => buttonClick(e.target.name)}
          >
            /
          </button>
        </div>
      </div>
    </>
  );
}

export default Keypad;
