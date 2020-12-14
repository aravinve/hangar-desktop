function WeatherBar({weatherData}) {
  const weatherIcon = 'http://openweathermap.org/img/w/';
  return (
    <div className='flex flex-row'>
      <div className='flex-auto'>
        <div className='bg-primary rounded-t-md shadow-md p-4'>
          <div className='flex flex-row justify-center'>
            <div className='flex-auto flex flex-row'>
              <h3 className='flex-shrink-0 text-3xl text-secondary select-none'>
                {weatherData.name}
              </h3>
              <div className='flex-auto text-lg inline-flex text-secondary select-none justify-center p-2'>
                <div className='mr-2'>
                  Temperature: {weatherData.main.temp.toString().concat(' C')}
                </div>
                <div className='mr-2'>
                Latitude: {weatherData.coord.lat}
                </div>
                <div className='mr-2'>
                Longitude: {weatherData.coord.lon}
                </div>
              </div>
              {weatherData.weather.map((element) => (
            <div className='flex-shrink-0 text-lg text-primary bg-secondary rounded-md shadow-md' key={element.id}>
              <img
                src={weatherIcon.concat(element.icon).concat('.png')}
                alt='iconofweather'
              />
            </div>
          ))}
            </div>
          </div>
        </div>
        <div className='flex-auto bg-secondary text-primary p-4'>
          <div className='flex flex-col'>
            <div className='flex-auto text-primary'>
              Maximum Temperature: {weatherData.main.temp_max}
            </div>
            <div className='flex-auto text-primary'>
              Minimum Temperature: {weatherData.main.temp_min}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex-auto text-primary'>
              Pressure: {weatherData.main.pressure}
            </div>
            <div className='flex-auto text-primary'>
              Humidity: {weatherData.main.humidity}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex-auto text-primary'>
              Feels Like: {weatherData.main.feels_like}
            </div>
          </div>
        </div>
        <div className='flex-auto bg-primary p-1 rounded-b-md shadow-md'>
          &nbsp;
        </div>
      </div>
    </div>
  );
}
export default WeatherBar;
