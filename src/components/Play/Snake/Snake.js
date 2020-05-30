import React from 'react';

function Snake(props) {
  return (
    <div>
      {props.snakeDots.map((dot, index) => {
        const style = {
          left: `${dot[0]}`,
          top: `${dot[1]}`,
          position: 'absolute',
          width: '2%',
          height: '2%',
          backgroundColor: '#000',
          border: '1px solid #fff',
        };
        return <div className='snake-dot' key={index} style={style}></div>;
      })}
    </div>
  );
}

export default Snake;
