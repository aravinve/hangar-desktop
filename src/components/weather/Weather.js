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
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchCity={searchCity}
          />
          <div
            className='flex-auto flex flex-col py-4 px-12 justify-center mt-4'>
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
