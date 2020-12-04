function WeatherBar({weatherData}) {
  const weatherIcon = 'http://openweathermap.org/img/w/';
  return (
    <div className='box has-background-light'>
      <div className='card'>
        <div className='card-header box has-background-dark'>
          <div className='columns'>
            <div className='column'>
              <h3 className='is-title is-3 has-text-white'>
                {weatherData.name}
              </h3>
              <div className='subtitle has-text-white'>
                Temperature: {weatherData.main.temp}
                <br />
                Latitude: {weatherData.coord.lat}
                <br />
                Longitude: {weatherData.coord.lon}
              </div>
            </div>
          </div>
        </div>
        <div className='card-content'>
          <div className='columns'>
            <div className='column'>
              Maximum Temperature: {weatherData.main.temp_max}
            </div>
            <div className='column'>
              Minimum Temperature: {weatherData.main.temp_min}
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              Pressure: {weatherData.main.pressure}
            </div>
            <div className='column'>
              Humidity: {weatherData.main.humidity}
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              Feels Like: {weatherData.main.feels_like}
            </div>
          </div>
        </div>
        <div className='card-footer'>
          {weatherData.weather.map((element) => (
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
