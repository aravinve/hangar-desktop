import React from 'react';

function Result(props) {
  return (
    <div
      className='box has-background-light'
      style={{ width: '15rem', overfloWrap: 'break-word' }}
    >
      <div className='content'>{props.result} </div>
    </div>
  );
}

export default Result;
