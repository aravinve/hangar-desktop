function WikiCard({name, url}) {
  return (
    <div className='flex flex-row'>
      <div className='flex-auto'>
        <div className='bg-secondary shadow-md rounded-md m-1 p-4'>
          <div className='flex flex-row justify-center'>
            <div className='flex-auto text-lg text-primary select-none'>{name}</div>
            <div className='flex-shrink-0'>
              <a
                href={url}
                className='cursor-pointer text-primary text-sm p-1 rounded-sm shadow-sm focus:outline-none'
                target='_blank'
              >
                <i class='fas fa-external-link-alt'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WikiCard;
