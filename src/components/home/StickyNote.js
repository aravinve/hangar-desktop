function StickyNote() {
  return (
    <>
      <div className='bg-secondary text-black shadow-md rounded-md fixed w-48' id='mydiv' style={cardStyle}>
        <div
          className='flex bg-primary rounded-t-md'
          id='mydivheader'
          style={cardHeaderStyle}
        >
          &nbsp;
        </div>
        <div className='text-primary p-1 font-medium text-xl outline-none focus:outline-none' contentEditable='true'>
          Notes Title
        </div>
        <div
          className='h-40 p-1 text-sm overflow-x-hidden overflow-y-auto outline-none focus:outline-none'
          contentEditable='true'
        >
          Notes Content
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  zIndex: '9',
  top: '1rem',
  left: '1rem',
};

const cardHeaderStyle = {
  cursor: 'move',
  zIndex: '10',
};

export default StickyNote;
