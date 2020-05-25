import React from 'react';

function WeatherBar(props) {
  const weatherIcon = 'http://openweathermap.org/img/w/';
  return (
    <div className='box has-background-light'>
      <div className='card'>
        <div className='card-header box has-background-dark'>
          <div className='columns'>
            <div className='column'>
              <h3 className='is-title is-3 has-text-white'>
                {props.weatherData.name}
              </h3>
              <div className='subtitle has-text-white'>
                Temperature: {props.weatherData.main.temp}
                <br />
                Latitude: {props.weatherData.coord.lat}
                <br />
                Longitude: {props.weatherData.coord.lon}
              </div>
            </div>
          </div>
        </div>
        <div className='card-content'>
          <div className='columns'>
            <div className='column'>
              Maximum Temperature: {props.weatherData.main.temp_max}
            </div>
            <div className='column'>
              Minimum Temperature: {props.weatherData.main.temp_min}
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              Pressure: {props.weatherData.main.pressure}
            </div>
            <div className='column'>
              Humidity: {props.weatherData.main.humidity}
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              Feels Like: {props.weatherData.main.feels_like}
            </div>
          </div>
        </div>
        <div className='card-footer'>
          {props.weatherData.weather.map((element) => (
            <div className='card-footer-item' key={element.id}>
              <img
                src={weatherIcon.concat(element.icon).concat('.png')}
                alt=''
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default WeatherBar;
