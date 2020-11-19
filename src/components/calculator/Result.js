import React from 'react';

function Result(props) {
  return (
    <div
      className='box has-background-light mt-5'
      style={{ width: props.size, overflowWrap: 'break-word' }}
    >
      <div className='content'>{props.result}</div>
    </div>
  );
}

export default Result;
