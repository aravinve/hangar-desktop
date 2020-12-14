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
    fetch('https://covid19.mathdro.id/api')
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
       <div className='flex flex-row items-center mt-32 px-4 py-6 justify-center'>
       <SidePane
            showGlobalStats={showGlobalStats}
            showCountriesList={countriesList}
            handleChange={handleChange}
          />
          <div className='flex-auto px-12 py-10'>
            {covidData !== '' ? (
              <CovidCard
                covidData={covidData}
                header={header}
                showConfirmDetail={showConfirmDetail}
              />
            ) : null}
            {detailTable !== null ? (
              <>
                <div className='flex flex-row justify-center mt-4 text-center'>
                  <table className='flex-1 border-black'>
                    <thead className="bg-primary text-secondary">
                      <tr className="p-2">
                        <td className="p-2">Country</td>
                        <td className="p-2">Province State</td>
                        <td className="p-2">Active</td>
                        <td className="p-2">Confirmed</td>
                        <td className="p-2">Recovered</td>
                        <td className="p-2">Deaths</td>
                        <td className="p-2">Incident Rate</td>
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
