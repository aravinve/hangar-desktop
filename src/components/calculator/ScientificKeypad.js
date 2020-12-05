function ScientificKeypad({buttonClick}) {
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
          <button
            className='button'
            name='%'
            onClick={(e) => buttonClick(e.target.name)}
          >
            %
          </button>
          <button
            className='button'
            name='plusminus'
            onClick={(e) => buttonClick(e.target.name)}
          >
            &#177;
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
          <button
            className='button'
            name='pi'
            onClick={(e) => buttonClick(e.target.name)}
          >
            &#960;
          </button>
          <button
            className='button'
            name='log'
            onClick={(e) => buttonClick(e.target.name)}
          >
            log
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
          <button
            className='button'
            name='sqrt'
            onClick={(e) => buttonClick(e.target.name)}
          >
            &radic;
          </button>
          <button
            className='button'
            name='sin'
            onClick={(e) => buttonClick(e.target.name)}
          >
            sin
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
          <button
            className='button'
            name='square'
            onClick={(e) => buttonClick(e.target.name)}
          >
            x&#178;
          </button>
          <button
            className='button'
            name='cos'
            onClick={(e) => buttonClick(e.target.name)}
          >
            cos
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
          <button
            className='button'
            name='e'
            onClick={(e) => buttonClick(e.target.name)}
          >
            e
          </button>
          <button
            className='button'
            name='tan'
            onClick={(e) => buttonClick(e.target.name)}
          >
            tan
          </button>
        </div>
      </div>
    </>
  );
}

export default ScientificKeypad;
