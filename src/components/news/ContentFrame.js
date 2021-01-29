function ContentFrame({contentTitle, contentData, contentUrl}) {
  return (
    <div className='flex-1 flex flex-row justify-center mt-16 mb-4 p-4'>
      {contentData !== null ? (
        <div className='flex-1 flex flex-col'>
          <div className='flex-1'>
            <div className='text-primary text-3xl mb-4 capitalize text-center mb-8'>{contentTitle} </div>
            <div className='text-primary mb-2 text-lg text-justify p-4'>{contentData}</div>
            <div className='mb-2 mt-2 p-4'>
              <a
                href={contentUrl}
                className='bg-primary cursor-pointer text-secondary text-sm px-4 py-2 m-1 rounded-sm focus:outline-none'
                target='_blank'>
                <i className='fas fa-external-link-alt'></i> Read More
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ContentFrame
