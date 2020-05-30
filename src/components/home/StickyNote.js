import React from 'react';

function StickyNote() {
  return (
    <React.Fragment>
      <div className='card' id='mydiv' style={cardStyle}>
        <div
          className='card-header has-background-dark'
          id='mydivheader'
          style={cardHeaderStyle}
        >
          &nbsp;
        </div>
        {/* <div className='content' style={cardToolStyle}>
          <span className=' button is-small card-footer-item'>
            <i className='fas fa-plus'></i>
          </span>
          <span className='button is-small card-footer-item'>
            <i className='fas fa-trash'></i>
          </span>
        </div> */}
        <div className='card-header-title' contentEditable='true'>
          Notes Title
        </div>
        <div
          className='card-content'
          contentEditable='true'
          style={cardContentStyle}
        >
          Notes Content
        </div>
      </div>
    </React.Fragment>
  );
}

const cardStyle = {
  position: 'fixed',
  textAlign: 'center',
  zIndex: '9',
  top: '1rem',
  left: '1rem',
  width: '14rem',
};

const cardHeaderStyle = {
  cursor: 'move',
  zIndex: '10',
};

const cardContentStyle = {
  height: '12rem',
  overflowX: 'hidden',
  overflowY: 'auto',
  textAlign: 'left',
  padding: '1rem',
};

const cardToolStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export default StickyNote;
