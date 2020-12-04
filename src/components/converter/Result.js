function Result({result}) {
  return (
    <div
      className='box has-background-light'
      style={{ width: '15rem', overfloWrap: 'break-word' }}
    >
      <div className='content'>{result} </div>
    </div>
  );
}

export default Result
