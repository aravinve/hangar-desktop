function DicDataCard({data}) {
  console.log(data)
  return (
    <div className='flex flex-row bg-primary rounded-sm shadow-md px-1 py-2 m-1'>
      <div className='flex-auto'>
        <div className='bg-secondary shadow-sm rounded-sm m-1 p-4'>
          <div className='flex flex-row justify-end'>
            <div className='flex-shrink-0 bg-primary text-secondary px-2 py-1 rounded-sm m-1 text-sm select-none'>
            <i className='fas fa-thumbtack mr-2'></i>
              {data.fl}
            </div>
          </div>
          <div className='flex flex-row justify-end'>
            {data.meta.stems.map((element) => (
              <div className='flex-shrink-0 bg-primary text-secondary px-2 py-1 rounded-sm m-1 select-none text-sm'>
                <i className='fas fa-tag mr-2'></i>
                {element}
              </div>
            ))}
          </div>
          {data.date !== undefined ? (
            <>
              <div className='text-lg text-primary select-none'><i className='fas fa-calendar mr-2'></i>Timeperiod</div>
              <div className="text-sm text-primary p-2">
              {data.date}
              </div>
            </>
          ) : null}
          {data.shortdef !== undefined ? (<>
            <div className='text-lg text-primary select-none'> <i className='fas fa-dot-circle mr-2'></i> Definition</div>
          <div className='flex flex-col p-2'>
            <div className='flex-auto text-primary text-sm'>
              <ul>
                {data.shortdef.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          </div>
          </>) : null}
          {data.et !== undefined ? (<>
            <div className='text-lg text-primary select-none'> <i className='fas fa-history mr-2'></i> Etymology</div>
          <div className='flex flex-col p-2'>
            {data.et != null
              ? data.et.map((element) =>
                  element.map((entry) => (
                    <div key={entry} className='flex-auto text-primary text-sm'>
                      {entry}
                    </div>
                  ))
                )
              : null}
          </div>
          </>) : null}
        </div>
      </div>
    </div>
  );
}

export default DicDataCard;
