function SidePane() {
  return (
    <div
      className='column is-3'
      style={{ paddingLeft: '2rem', marginTop: '4rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Hacker News</p>
      </nav>
    </div>
  );
}

export default SidePane
