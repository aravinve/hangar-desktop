function CovidCard({covidData, header, showConfirmDetail}) {
  const date = new Date(covidData.lastUpdate);
  return (
    <div className='bg-secondary text-primary flex flex-col shadow-md rounded-md'>
      <div className='flex p-4'>
        <div className='flex-1'>
          <h5 className='text-4xl'>
            {header}
          </h5>
        </div>
        {header !== 'Worldwide' ? (
          <div className='text-4xl'>
            <button
              className='bg-primary cursor-pointer text-secondary text-base py-1 px-2 rounded-sm shadow-sm focus:outline-none'
              onClick={() =>
                showConfirmDetail(covidData.confirmed.detail)
              }
            >
              View Detail
            </button>
          </div>
        ) : null}
      </div>
      <div className='flex-1 flex flex-row p-4 justify-center items-center'>
        <div className='flex-1 m-2 shadow-md rounded-md'>
          <div className='flex flex-col justify-center'>
            <div className='flex-1 bg-primary text-center p-1 rounded-t-md'>
              <div className='text-secondary text-xl'>
                Total Confirmed
              </div>
            </div>
            <div className='flex-1 bg-secondary text-center p-4 '>
              <div className='text-primary text-xl'>
                {covidData.confirmed.value}{' '}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 m-2 shadow-md rounded-md'>
          <div className='flex flex-col justify-center'>
            <div className='flex-1 bg-primary text-center p-1 rounded-t-md'>
              <div className='text-secondary text-xl'>
                Total Deaths
              </div>
            </div>
            <div className='flex-1 bg-secondary text-center p-4 '>
              <div className='text-primary text-xl'>
                {covidData.deaths.value}{' '}
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 m-2 shadow-md rounded-md'>
          <div className='flex flex-col justify-center'>
            <div className='flex-1 bg-primary text-center p-1 rounded-t-md'>
              <div className='text-secondary text-xl'>
                Total Recovered
              </div>
            </div>
            <div className='flex-1 bg-secondary text-center p-4 '>
              <div className='text-primary text-xl'>
                {covidData.recovered.value}{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1 p-2'>
        <div className='text-primary text-md'>
            Last Updated: {date.toString()}
          </div>
      </div>
    </div>
  );
}

export default CovidCard;
