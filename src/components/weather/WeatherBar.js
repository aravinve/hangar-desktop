function WeatherBar({weatherData}) {
  const weatherIcon = 'http://openweathermap.org/img/w/';
  return (
    <div className='flex flex-row'>
      <div className='flex-auto flex flex-row shadow-lg'>
        <div className='flex-1 bg-secondary border-primary rounded-l-md shadow-md p-4'>
          <div className='flex flex-row justify-center'>
            <div className='flex-auto flex flex-row justify-between'>
              <div className='flex-auto text-sm flex flex-col items-center text-primary select-none justify-center p-2'>
                <h3 className='flex-shrink-0 text-3xl text-primary select-none'>
                  {weatherData.name}
                </h3>
                <div className="flex flex-row items-center">
                    <div className='mr-2 text-primary text-xl'>
                    <i className="fas fa-temperature-high mr-2"></i>
                    {weatherData.main.temp.toString().concat(' C')}
                    </div>
                    {weatherData.weather.map((element) => (
                    <div className='flex-shrink-0 text-lg text-primary bg-secondary' key={element.id}>
                      <img
                        src={weatherIcon.concat(element.icon).concat('.png')}
                        alt='iconofweather'
                      />
                    </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-auto flex flex-col bg-primary text-secondary p-8 rounded-r-md'>
            <div className='flex-auto text-secondary'>
               Maximum Temperature: {weatherData.main.temp_max}
            </div>
            <div className='flex-auto text-secondary'>
              Minimum Temperature: {weatherData.main.temp_min}
            </div>
            <div className='flex-auto text-secondary'>
              Pressure: {weatherData.main.pressure}
            </div>
            <div className='flex-auto text-secondary'>
              Humidity: {weatherData.main.humidity}
            </div>
            <div className="flex-auto text-secondary">
              Latitude: {weatherData.coord.lat}
            </div>
            <div className="flex-auto text-secondary">
              Longitude: {weatherData.coord.lon}
            </div>
            <div className='flex-auto text-secondary'>
              Feels Like: {weatherData.main.feels_like}
            </div>
        </div>
      </div>
    </div>
  );
}
export default WeatherBar;
