function ContentFrame({contentData, contentUrl}) {
  return (
    <div className='container'>
      {contentData.length > 0 ? (
        <div className='column is-4' style={{ marginTop: '4rem' }}>
          <div className='content' style={{ position: 'fixed' }}>
            <div className='title'>News Detail</div>
            <div className='content'>{contentData}</div>
            <div className='content'>
              <a
                href={contentUrl}
                className='button is-small is-dark'
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
