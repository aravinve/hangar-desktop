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
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchWord={searchWordFunction}
          />
          <div
            className='flex-auto flex flex-col justify-center mt-4'>
            {searchWord !== '' ? (
              <h3 className='select-none text-4xl capitalize p-2 text-primary'>
                {searchWord}
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