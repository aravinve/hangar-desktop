import  { useState } from 'react';
import SidePane from './SidePane';
import WeatherBar from './WeatherBar';
import Dashboard from '../home/Dashboard';

function Weather() {
  const [weatherData, setWeatherData] = useState('')
  const [city, setCity] = useState('')

  const loadWeather = (searchCity) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = process.env.REACT_APP_WEATHER_KEY
    let testURL = `${apiUrl}?q=${searchCity}&units=metric&appid=${apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data)
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const handleChange = (e) => {
    setCity(e.target.value)
  };

  const searchCity = () => {
    loadWeather(city);
  }

  return (
    <>
      <div className='columns'>
          <SidePane
            handleChange={handleChange}
            searchCity={searchCity}
          />
          <div
            className='column is-9 .is-centered'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {weatherData !== '' ? (
              <WeatherBar weatherData={weatherData} />
            ) : null}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Weather
