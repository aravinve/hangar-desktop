function Result({result}) {
  return (
    <div
      className='mt-4 mb-4 bg-primary shadow-lg p-4 rounded-md'
      style={{overfloWrap: 'break-word' }}>
      <div className='text-sm text-secondary select-none'>{result} </div>
    </div>
  );
}

export default Result
