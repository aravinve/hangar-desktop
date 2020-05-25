import React from 'react';
import Tools from './Tools';

function Overlay(props) {
  const styleOverlay = {
    width: '100%',
    height: '100vh',
    margin: '0px',
    backgroundImage: 'url(' + props.imageUrl + ')',
    backgroundSize: 'cover',
    backgroundClip: 'border-box',
    backgroundPosition: 'center',
    opacity: '90%',
    backgroundRepeat: 'no-repeat',
    WebkitAnimation: 'fadein 2s',
    MozAnimation: 'fadein 2s',
    animation: 'fadein 2s',
  };

  return (
    <div className='fadein' style={styleOverlay}>
      <div className='columns' style={{ padding: '4rem' }}>
        <div className='column'>
          <div className='box is-pulled-right has-background-light'>
            <h1 className='title is-1 has-text-dark'>
              Welcome, {props.userName}{' '}
            </h1>
            {props.showSettings ? (
              <Tools
                handleChange={props.handleChange}
                changeOverlay={props.changeOverlay}
                changeSearchTerm={props.changeSearchTerm}
                changeSettingsMenu={props.changeSettingsMenu}
              />
            ) : (
              <h3 className='is-size-3'>{props.clock}</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
