function Article({article, activateContentFrame}) {
  return (
    <div className='columns is-centered'>
      <div className='column is-8'>
        <div className='card'>
          <div className='card-image'>
            {article.urlToImage != null ? (
              <img src={article.urlToImage} alt='Sample Image' />
            ) : (
              <i
                className='fas fa-newspaper'
                style={{ fontSize: '4rem', marginLeft: '10rem' }}
              ></i>
            )}
          </div>
          <div className='card-header'>
            <div className='card-header-title'>{article.title}</div>
          </div>
          <div className='card-content'>
            {article.author !== null ? (
              <div className='tag is-dark' style={{ margin: '0.5rem' }}>
                Author: {article.author}{' '}
              </div>
            ) : null}
            {article.source.name !== null ? (
              <div className='tag is-dark' style={{ margin: '0.5rem' }}>
                Source: {article.source.name}{' '}
              </div>
            ) : null}
          </div>
          <div className='card-footer'>
            <button
              className='button card-footer-item is-dark'
              onClick={() =>
                activateContentFrame(
                  article.description,
                  article.url
                )
              }
            >
              Show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
