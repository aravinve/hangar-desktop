import React from 'react';

function Article(props) {
  return (
    <div className='columns is-centered'>
      <div className='column is-8'>
        <div className='card'>
          <div className='card-image'>
            {props.article.urlToImage != null ? (
              <img src={props.article.urlToImage} alt='Sample Image' />
            ) : (
              <i
                className='fas fa-newspaper'
                style={{ fontSize: '4rem', marginLeft: '10rem' }}
              ></i>
            )}
          </div>
          <div className='card-header'>
            <div className='card-header-title'>{props.article.title}</div>
          </div>
          <div className='card-content'>
            {props.article.author !== null ? (
              <div className='tag is-dark' style={{ margin: '0.5rem' }}>
                Author: {props.article.author}{' '}
              </div>
            ) : null}
            {props.article.source.name !== null ? (
              <div className='tag is-dark' style={{ margin: '0.5rem' }}>
                Source: {props.article.source.name}{' '}
              </div>
            ) : null}
          </div>
          <div className='card-footer'>
            <button
              className='button card-footer-item is-dark'
              onClick={() =>
                props.activateContentFrame(
                  props.article.description,
                  props.article.url
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
