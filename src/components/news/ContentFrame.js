import React from 'react';

function ContentFrame(props) {
  return (
    <div className='container'>
      {props.contentData.length > 0 ? (
        <div className='column is-4' style={{ marginTop: '4rem' }}>
          <div className='content' style={{ position: 'fixed' }}>
            <div className='title'>News Detail</div>
            <div className='content'>{props.contentData}</div>
            <div className='content'>
              <a
                href={props.contentUrl}
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

export default ContentFrame;
