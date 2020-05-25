import React from 'react';

function DicDataCard(props) {
  return (
    <div className='columns'>
      <div className='column'>
        <div className='box'>
          <div className='content'>
            <div className='tag is-black' style={{ margin: '0.5rem' }}>
              {props.data.fl}
            </div>
          </div>
          <div className='content'>
            {props.data.meta.stems.map((element) => (
              <div className='tag is-black' style={{ margin: '0.5rem' }}>
                {element}
              </div>
            ))}
          </div>
          <div className='subtitle'>Timeperiod: {props.data.date}</div>
          <div className='card-header-title'>Definition</div>
          <div className='columns' style={{ padding: '2rem' }}>
            <div className='column'>
              <ol>
                {props.data.shortdef.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className='card-header-title'>Etymology</div>
          <div className='columns' style={{ padding: '2rem' }}>
            {props.data.et != null
              ? props.data.et.map((element) =>
                  element.map((entry) => (
                    <div key={entry} className='column'>
                      {entry}
                    </div>
                  ))
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DicDataCard;
