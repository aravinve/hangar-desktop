import { useState, useEffect } from 'react';
import SidePane from './SidePane';
import Dashboard from '../home/Dashboard';
import CovidCard from './CovidCard';
import CountrySelect from './CountrySelect';
import CovidTable from './CovidTable';
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Covid() {
  
  const [covidData, setCovidData] = useState('')
  const [header, setHeader] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [detailData, setDetailData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)

  useEffect(async () => {
    setLoading(true)
    loadGlobalData()
    const hangarData = await hangarFetch('covidcountries', 'https://covid19.mathdro.id/api/countries')
    await setCountries(hangarData.countries)
    setLoading(false)
  }, [])

  const loadGlobalData = async () => {
    const hangarData = await hangarFetch('covidglobal', 'https://covid19.mathdro.id/api')
    await setCovidData(hangarData)
    setHeader('Worldwide')
    setDetailData('')
  }

  const showGlobalStats = () => {
    loadGlobalData();
  }

  const handleChange = async (e) => {
    const countryFromSelect = e.target.value;
    await setCountry(countryFromSelect)
    const countryFetchKey = `covid-${countryFromSelect}`
    const hangarData = await hangarFetch(countryFetchKey, `https://covid19.mathdro.id/api/countries/${countryFromSelect}`)
    await setCovidData(hangarData)
    await setHeader(countryFromSelect)
    await setDetailData('')
  }

  const showConfirmDetail = async (targetUrl) => {
    setLoadingTable(true)
    const hangarData = await hangarFetch(`covid-detail-${country}`, targetUrl)
    await setDetailData(hangarData)
    setLoadingTable(false)
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
        {!loading ? (<div className='flex flex-row items-center mt-32 mb-8 px-4 py-6 justify-center'>
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
            {!loadingTable ? (detailTable !== null ? (
              <>
                <div className='flex flex-row justify-center mt-4 mb-8 text-center'>
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
            ) : null) : <Loader />}
          </div>
        </div>) : (<Loader />)}
        <Dashboard />
    </>
  )
}

export default Covid
