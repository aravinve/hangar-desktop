import React, { Component } from 'react';
import SidePane from './SidePane';
import WeatherBar from './WeatherBar';
import Dashboard from '../home/Dashboard';

class Weather extends Component {
  state = {
    apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: '',
    weatherData: '',
    city: '',
  };

  loadWeather(searchCity) {
    let testURL = `${this.state.apiUrl}?q=${searchCity}&units=metric&appid=${this.state.apiKey}`;

    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ weatherData: data });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchCity = () => {
    this.loadWeather(this.state.city);
  };
  render() {
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            handleChange={this.handleChange}
            searchCity={this.searchCity}
          />
          <div
            className='column is-9 .is-centered'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {this.state.weatherData !== '' ? (
              <WeatherBar weatherData={this.state.weatherData} />
            ) : null}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Weather;
