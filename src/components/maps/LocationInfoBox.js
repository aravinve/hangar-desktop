
function LocationInfoBox({info, clickHandler}) {
    const paneStyle = {
        top: '2rem',
        right: '2rem',
        width: '400px',
        padding: '1rem'
    }
    return (
        <div className='fixed bg-secondary shadow-md rounded-md select-none' style={paneStyle}>
            <div className="flex flex-row justify-between">
            <h2 className="text-2xl text-primary mt-1 mb-3">
            <i className="fas fa-map-marker-alt mr-2"></i> Event Location Info
            </h2>
            <i className="cursor-pointer fas fa-times mt-3 text-primary" onClick={clickHandler}></i>
            </div>
            <div className="text-lg text-primary mt-1 mb-1">
                ID: {info.id}
            </div>
            <div className="text-lg text-primary mt-1 mb-1">
                Title: {info.title}
            </div>
        </div>
    )
}

export default LocationInfoBox
