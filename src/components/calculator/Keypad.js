function Keypad({buttonClick}) {
  return (
    <>
      <div className='flex flex-row mx-0 my-2 p-1'>
        <div className='grid grid-cols-5 gap-2'>
        <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='7'
            onClick={(e) => buttonClick(e.target.name)}
          >
            7
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='8'
            onClick={(e) => buttonClick(e.target.name)}
          >
            8
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='9'
            onClick={(e) => buttonClick(e.target.name)}
          >
            9
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='*'
            onClick={(e) => buttonClick(e.target.name)}
          >
            *
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='('
            onClick={(e) => buttonClick(e.target.name)}
          >
            (
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='4'
            onClick={(e) => buttonClick(e.target.name)}
          >
            4
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='5'
            onClick={(e) => buttonClick(e.target.name)}
          >
            5
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='6'
            onClick={(e) => buttonClick(e.target.name)}
          >
            6
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='-'
            onClick={(e) => buttonClick(e.target.name)}
          >
            -
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name=')'
            onClick={(e) => buttonClick(e.target.name)}
          >
            )
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='1'
            onClick={(e) => buttonClick(e.target.name)}
          >
            1
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='2'
            onClick={(e) => buttonClick(e.target.name)}
          >
            2
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='3'
            onClick={(e) => buttonClick(e.target.name)}
          >
            3
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='+'
            onClick={(e) => buttonClick(e.target.name)}
          >
            +
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='CE'
            onClick={(e) => buttonClick(e.target.name)}
          >
            CE
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='.'
            onClick={(e) => buttonClick(e.target.name)}
          >
            .
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='0'
            onClick={(e) => buttonClick(e.target.name)}
          >
            0
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='='
            onClick={(e) => buttonClick(e.target.name)}
          >
            =
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='/'
            onClick={(e) => buttonClick(e.target.name)}
          >
            /
          </button>
          <button
            className='bg-secondary cursor-pointer text-primary text-sm px-4 py-2 rounded-sm focus:outline-none shadow-md hover:bg-blue-900 hover:text-white'
            name='C'
            onClick={(e) => buttonClick(e.target.name)}
          >
            C
          </button>
        </div>
      </div>
    </>
  );
}

export default Keypad;
