import { useState, useEffect } from 'react';
import SidePane from './SidePane';
import Dashboard from '../home/Dashboard';
import CovidCard from './CovidCard';
import CountrySelect from './CountrySelect';
import CovidTable from './CovidTable';

function Covid() {
  
  const [covidData, setCovidData] = useState('')
  const [header, setHeader] = useState('')
  const [countries, setCountries] = useState([])
  const [detailData, setDetailData] = useState([])

  useEffect(() => {
    loadGlobalData();
    fetch('https://covid19.mathdro.id/api/countries')
      .then((countryResponse) => {
        return countryResponse.json();
      })
      .then((countryData) => {
        setCountries(countryData.countries)
      });
  }, [])

  const loadGlobalData = () => {
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCovidData(data)
        setHeader('Worldwide')
        setDetailData('')
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const showGlobalStats = () => {
    loadGlobalData();
  }

  const showTodayStats = () => {
    loadTodayData();
  }

  const handleChange = (e) => {
    const country = e.target.value;
    fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCovidData(data)
        setHeader(country)
        setDetailData('')
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const showConfirmDetail = (targetUrl) => {
    fetch(targetUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDetailData(data)
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const countriesList =
      countries.length > 0
        ? countries.map((country) => (
            <CountrySelect country={country.name} key={country.name} />
          ))
        : null

    const detailTable =
      detailData.length > 0
        ? detailData.map((detail) => (
            <CovidTable detail={detail} key={detail.uid} />
          ))
        : null

  return (
    <>
       <div className='columns'>
          <SidePane
            showGlobalStats={showGlobalStats}
            showCountriesList={countriesList}
            handleChange={handleChange}
          />
          <div
            className='column is-9 is-centered'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {covidData !== '' ? (
              <CovidCard
                covidData={covidData}
                header={header}
                showConfirmDetail={showConfirmDetail}
              />
            ) : null}
            {detailTable !== null ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Covid
