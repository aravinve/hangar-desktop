function ContentFrame({contentData, contentUrl}) {
  return (
    <div className='flex-1 flex flex-row justify-center'>
      {contentData !== null ? (
        <div className='flex mt-16 mb-4 p-4'>
          <div className='flex-auto'>
            <div className='text-primary text-3xl mb-4'>News Detail</div>
            <div className='text-primary mb-2 text-lg text-justify'>{contentData}</div>
            <div className='text-primary mb-2 text-sm'>
              <a
                href={contentUrl}
                className='bg-secondary cursor-pointer text-primary text-sm p-1 m-1 rounded-sm focus:outline-none'
                target='_blank'
              >
                <i class='fas fa-external-link-alt'></i>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ContentFrame
