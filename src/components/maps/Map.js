import {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'

function Map({eventData, center, zoom}) {
    const [locationInfo, setLocationInfo] = useState(null)
    const markers = eventData !== undefined ?
         eventData.map(ev => {
            if(ev.categories[0].id === 8){
               return  <LocationMarker key={ev.id} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({id: ev.id, title: ev.title})} />
            }
        })
    : null
    return (
      <div className="w-screen h-screen relative">
           <GoogleMapReact
           bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
           defaultCenter={center}
           defaultZoom={zoom}>
               {markers}
       </GoogleMapReact>
       {locationInfo && <LocationInfoBox info={locationInfo} clickHandler={() => setLocationInfo(null)} />}
      </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 1.3521,
        lng: 103.8198
    },
    zoom: 2
}

export default Map
