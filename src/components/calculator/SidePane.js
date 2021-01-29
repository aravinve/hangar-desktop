function SidePane({handleChange}) {
  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }
  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary' style={paneStyle}>
      <nav>
        <p className='bg-primary w-full p-2 rounded-t-md inline-flex items-center text-secondary text-xl select-none'><i className="fas fa-calculator mr-2"></i>Calculator</p>
        <div className='flex flex-row p-4'>
                <div className='flex-1 inline-flex'>
                  <p className='text-primary text-sm inline-flex items-center mr-2'>
                  <i className='fas fa-cog mr-2'></i> Mode</p>
                </div>
                <div className='inline-flex items-center m-1'>
                  <select
                    name='modeChange'
                    id='mode-changer'
                    className="rounded-md shadow-md p-1 text-sm text-primary outline-none focus:outline-none"
                    onChange={handleChange}>
                    <option value='simple'>Simple</option>
                    <option value='scientific'>Scientific</option>
                  </select>
                </div>
              </div>
      </nav>
    </div>
  );
}

export default SidePane;
