function HackerBar({story}) {
  return (
    <div className='columns'>
      <div className='column is-8'>
        <div className='box'>
          <div className='columns'>
            <div className='column is-10 is-size-5'>{story.title}</div>
            <div className='column is-2'>
              <a
                href={story.url}
                className='button is-small is-dark'
                target='_blank'
              >
                <i class='fas fa-external-link-alt'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackerBar
