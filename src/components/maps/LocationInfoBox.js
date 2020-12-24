
function LocationInfoBox({info}) {
    const paneStyle = {
        top: '2rem',
        right: '2rem',
        width: '400px',
        padding: '1rem'
    }
    return (
        <div className='fixed bg-secondary shadow-md rounded-md select-none' style={paneStyle}>
            <h2 className="text-2xl text-primary mt-1 mb-3">
                Event Location Info
            </h2>
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
