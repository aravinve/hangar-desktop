function HackerBar({story}) {
  return (
    <div className='flex justify-center flex-row'>
      <div className='flex-1'>
        <div className='bg-secondary shadow-md rounded-md m-1 p-4'>
          <div className='flex flex-row justify-start'>
            <div className='flex-auto text-lg text-primary select-none'>{story.title}</div>
            <div className='flex-shrink-0'>
              <a
                href={story.url}
                className='cursor-pointer text-primary text-sm p-1 rounded-sm shadow-sm focus:outline-none'
                target='_blank'>
                <i className='fas fa-external-link-alt'></i>
              </a>
            </div>
          </div>
          <div className="flex flex-row w-1/4 justify-start p-1 mt-1 mb-1">
            <div className="flex-1 text-primary text-sm">
              <i className="fas fa-user mr-1"></i> {story.by}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackerBar
