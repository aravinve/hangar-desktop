import React from 'react';

function CovidCard(props) {
  const date = new Date(props.covidData.lastUpdate);
  return (
    <div className='box has-background-light'>
      <div className='columns'>
        <div className='column'>
          <h5
            className='is-title has-text-dark'
            style={{ textAlign: 'center' }}
          >
            {props.header}
          </h5>
        </div>
        {props.header !== 'Worldwide' ? (
          <div className='content'>
            <button
              className='button is-small is-dark'
              onClick={() =>
                props.showConfirmDetail(props.covidData.confirmed.detail)
              }
            >
              View Detail
            </button>
          </div>
        ) : null}
      </div>
      <div className='columns'>
        <div className='column'>
          <div className='card has-background-warning has-text-black'>
            <div className='card-header'>
              <div className='card-header-title is-size-4 has-text-black'>
                Total Confirmed
              </div>
            </div>
            <div className='card-content has-background-light has-text-black'>
              <div className='content is-size-5'>
                {props.covidData.confirmed.value}{' '}
              </div>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='card has-background-danger has-text-white'>
            <div className='card-header'>
              <div className='card-header-title has-text-white is-size-4'>
                Total Deaths
              </div>
            </div>
            <div className='card-content has-background-light has-text-black'>
              <div className='content is-size-5'>
                {props.covidData.deaths.value}{' '}
              </div>
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='card has-background-success has-text-white'>
            <div className='card-header'>
              <div className='card-header-title has-text-white is-size-4'>
                Total Recovered
              </div>
            </div>
            <div className='card-content has-background-light has-text-black'>
              <div className='content is-size-5 '>
                {props.covidData.recovered.value}{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='columns'>
        <div className='column'>
          <div className='is-size-5 has-text-dark'>
            Last Updated: {date.toString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CovidCard;
