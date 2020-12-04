import { useState } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import DicDataCard from './DicDataCard';

function Dictionary() {
  const [result, setResult] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const loadResult = (searchWord) => {
    const testURL = `${this.state.apiUrl}/${searchWord}/?key=${this.state.apiKey}`;
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

  const searchWord = () => {
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
            searchWord={searchWord}
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