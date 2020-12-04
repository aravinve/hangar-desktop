function DicDataCard({data}) {
  return (
    <div className='columns'>
      <div className='column'>
        <div className='box'>
          <div className='content'>
            <div className='tag is-black' style={{ margin: '0.5rem' }}>
              {data.fl}
            </div>
          </div>
          <div className='content'>
            {data.meta.stems.map((element) => (
              <div className='tag is-black' style={{ margin: '0.5rem' }}>
                {element}
              </div>
            ))}
          </div>
          <div className='subtitle'>Timeperiod: {data.date}</div>
          <div className='card-header-title'>Definition</div>
          <div className='columns' style={{ padding: '2rem' }}>
            <div className='column'>
              <ol>
                {data.shortdef.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className='card-header-title'>Etymology</div>
          <div className='columns' style={{ padding: '2rem' }}>
            {data.et != null
              ? data.et.map((element) =>
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
