function StickyNote() {
  return (
    <>
      <div className='card' id='mydiv' style={cardStyle}>
        <div
          className='card-header has-background-dark'
          id='mydivheader'
          style={cardHeaderStyle}
        >
          &nbsp;
        </div>
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
    </>
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

export default StickyNote;
