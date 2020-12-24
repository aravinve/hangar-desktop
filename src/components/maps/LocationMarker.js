function LocationMarker({lat, lng, onClick}) {
    return (
        <div className='cursor-pointer' onClick={onClick}>
            <div className="block text-xl text-primary">
                <i className="fas fa-fire"></i>
            </div>
        </div>
    )
}

export default LocationMarker
