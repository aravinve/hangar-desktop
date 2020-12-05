import { useState } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import DicDataCard from './DicDataCard';

function Dictionary() {
  const [result, setResult] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const loadResult = (searchWord) => {
    const apiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json'
    const apiKey = process.env.REACT_APP_DICTIONARY_KEY
    const testURL = `${apiUrl}/${searchWord}/?key=${apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResult(data)
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const handleChange = (e) => {
    setSearchWord(e.target.value)
    if (e.target.value === '') {
      setResult([])
    }
  }

  const searchWordFunction = () => {
    loadResult(searchWord);
  }

  const resultsData = result.map((data) => (
    <DicDataCard key={data.meta.uuid} data={data} />
  ))

  return (
    <>
      <div className='columns'>
          <SidePane
            handleChange={handleChange}
            searchWord={searchWordFunction}
          />
          <div
            className='column is-9'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {searchWord !== '' ? (
              <h3 className='is-title box has-background-light'>
                {searchWord}{' '}
              </h3>
            ) : null}
            {resultsData}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Dictionary