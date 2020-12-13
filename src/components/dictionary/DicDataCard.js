function DicDataCard({data}) {
  return (
    <div className='flex flex-row bg-primary rounded-sm shadow-md px-1 py-2 m-1'>
      <div className='flex-auto'>
        <div className='bg-secondary shadow-sm rounded-sm m-1 p-4'>
          <div className='flex flex-row justify-end'>
            <div className='flex-shrink-0 bg-primary text-secondary px-2 py-1 rounded-sm m-1 select-none'>
              {data.fl}
            </div>
          </div>
          <div className='flex flex-row justify-end'>
            {data.meta.stems.map((element) => (
              <div className='flex-shrink-0 bg-primary text-secondary px-2 py-1 rounded-sm m-1 select-none'>
                {element}
              </div>
            ))}
          </div>
          <div className='text-lg text-primary select-none'>Timeperiod</div>
          <div className="text-sm text-primary p-2">
          {data.date}
          </div>
          <div className='text-lg text-primary select-none'>Definition</div>
          <div className='flex flex-col p-2'>
            <div className='flex-auto text-primary text-sm'>
              <ol>
                {data.shortdef.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className='text-lg text-primary select-none'>Etymology</div>
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
        </div>
      </div>
    </div>
  );
}

export default DicDataCard;
