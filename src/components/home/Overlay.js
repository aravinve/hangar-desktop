import React from 'react';

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
  };
  return <div style={styleOverlay}></div>;
}

export default Overlay;
