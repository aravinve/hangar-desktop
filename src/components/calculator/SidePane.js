import React from 'react';

function SidePane(props) {
  return (
    <div
      className='column is-5'
      style={{ paddingLeft: '2rem', marginTop: '2rem' }}
    >
      <nav className='panel' style={{ position: 'fixed' }}>
        <p className='panel-heading'>Calculator</p>
        <div className='panel-block'>
                <div className='panel-block'>
                  <span className='icon is-left'>
                    <i className='fas fa-cog'></i>
                  </span>
                  <p className='has-icons-left'>Mode</p>
                </div>
                <div className='select is-dark is-small'>
                  <select
                    name='modeChange'
                    id='mode-changer'
                    onChange={props.handleChange}
                  >
                    <option value='simple'>Simple</option>
                    <option value='scientific'>Scientific</option>
                  </select>
                </div>
              </div>
      </nav>
    </div>
  );
}

export default SidePane;
