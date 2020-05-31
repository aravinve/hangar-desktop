import React, { Component } from 'react';
import SidePane from './SidePane';
import Dashboard from '../home/Dashboard';
import CovidCard from './CovidCard';
import CountrySelect from './CountrySelect';
import CovidTable from './CovidTable';

class Covid extends Component {
  state = {
    apiUrl: 'https://covid19.mathdro.id/api',
    covidData: '',
    header: '',
    countries: [],
    detailData: [],
  };
  componentDidMount() {
    this.loadGlobalData();
    fetch('https://covid19.mathdro.id/api/countries')
      .then((countryResponse) => {
        return countryResponse.json();
      })
      .then((countryData) => {
        this.setState({ countries: countryData.countries });
      });
  }

  loadGlobalData = () => {
    fetch(this.state.apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ covidData: data, header: 'Worldwide', detailData: '' });
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  showGlobalStats = () => {
    this.loadGlobalData();
  };
  showTodayStats = () => {
    this.loadTodayData();
  };
  handleChange = (e) => {
    const country = e.target.value;
    fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ covidData: data, header: country, detailData: '' });
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  showConfirmDetail = (targetUrl) => {
    fetch(targetUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ detailData: data });
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  render() {
    const countriesList =
      this.state.countries.length > 0
        ? this.state.countries.map((country) => (
            <CountrySelect country={country.name} key={country.name} />
          ))
        : null;
    const detailTable =
      this.state.detailData.length > 0
        ? this.state.detailData.map((detail) => (
            <CovidTable detail={detail} key={detail.uid} />
          ))
        : null;
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            showGlobalStats={this.showGlobalStats}
            showCountriesList={countriesList}
            handleChange={this.handleChange}
          />
          <div
            className='column is-9 is-centered'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {this.state.covidData !== '' ? (
              <CovidCard
                covidData={this.state.covidData}
                header={this.state.header}
                showConfirmDetail={this.showConfirmDetail}
              />
            ) : null}
            {detailTable !== null ? (
              <React.Fragment>
                <div
                  className='table-container'
                  style={{ textAlign: 'center' }}
                >
                  <table className='table'>
                    <thead>
                      <tr>
                        <td>Country</td>
                        <td>Province State</td>
                        <td>Active</td>
                        <td>Confirmed</td>
                        <td>Recovered</td>
                        <td>Deaths</td>
                        <td>Incident Rate</td>
                      </tr>
                    </thead>
                    {detailTable}
                  </table>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Covid;
