import { useState } from 'react'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import DicDataCard from './DicDataCard'
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Dictionary() {
  const [result, setResult] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  const loadResult = async (searchWord) => {
    const apiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json'
    const apiKey = process.env.REACT_APP_DICTIONARY_KEY
    const testURL = `${apiUrl}/${searchWord}/?key=${apiKey}`
    const myInit = {
      mode: 'no-cors',
    }
    const myRequest = new Request(testURL, myInit)
    const dictionaryWords = await hangarFetch(`dictionary-${searchWord}`, myRequest)
    await setResult(dictionaryWords)
    if(dictionaryWords.length <= 0){
      setAlert(true)
    } else{
      setAlert(false)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setSearchWord(e.target.value)
    setAlert(false)
    if (e.target.value === '') {
      setResult([])
    }
  }

  const searchWordFunction = () => {
    setLoading(true)
    loadResult(searchWord)
  }

  const searchSuggested = (e) => {
    setLoading(true)
    setSearchWord(e.target.innerText)
    setAlert(false)
    loadResult(e.target.innerText)
  }

  const resultsData = result !== null && result.length > 0 ? result.map((data) => {
    if(data["meta"] !== undefined){
      return (<DicDataCard key={data.meta.uuid} data={data} />)
    } else{
      return (<>
        <div className='cursor-pointer text-md text-primary flex-1 text-center underline p-1' onClick={(e) => searchSuggested(e)}> {data} </div>
      </>)
    }
  }) : null

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{searchWord.concat(' not available!!!')} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different word!!!'} </h2>
  </div>) : null

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
            {!loading ? (<div className='flex flex-col justify-center'>
              {resultsData}
            </div>) : <Loader /> }
            {alertMessage}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Dictionary