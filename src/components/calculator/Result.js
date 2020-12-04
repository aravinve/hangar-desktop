function Result({size, result}) {
  return (
    <div
      className='box has-background-light mt-5'
      style={{ width: size, overflowWrap: 'break-word' }}
    >
      <div className='content'>{result}</div>
    </div>
  );
}

export default Result
