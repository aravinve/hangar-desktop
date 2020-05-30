import React from 'react';
import { Link } from 'react-router-dom';

function PlayCard(props) {
  return (
    <div className='column is-4'>
      <div className='card'>
        <div className='card-image'>
          <img src={props.data.imageUrl} alt='Sample Image' />
        </div>
        <div className='content' style={{ textAlign: 'center' }}>
          <div className='is-size-3'>{props.data.name} </div>
        </div>
        <div className='card-footer'>
          <div className='card-footer-item'>
            <Link className='button is-dark is-small' to={props.data.to}>
              Play
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayCard;
