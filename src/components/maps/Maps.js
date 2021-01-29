import { useState, useEffect } from 'react'
import Dashboard from '../home/Dashboard'
import Map from './Map'
import SidePane from './SidePane'
import Loader from '../../Loader'
import hangarFetch from '../../HangarFetch'

function Maps() {

  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)
  const [eo, setEo] = useState(false)
  const [normal, setNormal] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
        setLoading(true)
        const myRequest = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
        const mapsApiResponse = await hangarFetch(`maps-events-response`, myRequest)
        await setEventData(mapsApiResponse.events)
        setLoading(false)
    }
    fetchEvent()
  }, [])

  const loadSelectData = (e) => {
    if(e.target.value === 'eo'){
      setEo(true)
      setNormal(false)
    } else{
      setEo(false)
      setNormal(true)
    }
  }
  

  return (
      <>
        <SidePane loadSelectData={loadSelectData} />
        {eo ? (!loading ? <Map eventData={eventData} /> : <Loader />)  : null}
        {normal ? (!loading ? <Map /> : <Loader />)  : null}
        <Dashboard />
      </>
  )
}

export default Maps
