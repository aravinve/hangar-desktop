function SidePane() {
  const paneStyle = {
    top: '2rem',
    left: '2rem'
  }
  return (
    <div
      className='absolute w-auto h-auto shadow-md rounded-md bg-secondary'
      style={paneStyle}
    >
      <nav>
        <p className='bg-primary w-full p-2 rounded-md inline-flex items-center text-secondary text-xl select-none'>
        <i className="fab fa-hacker-news-square mr-2"></i> Hacker News</p>
      </nav>
    </div>
  );
}

export default SidePane
