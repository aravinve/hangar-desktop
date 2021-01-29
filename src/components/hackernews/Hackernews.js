import { useState, useEffect } from 'react'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import HackerBar from './HackerBar'
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Hackernews() {
  const [header, setHeader] = useState('')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(async () => {
    setLoading(true)
    const testURL = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    const jsonData = await hangarFetch(`hacker-news-new`, myRequest)
    const dataIds = jsonData.slice(0, 10)
    const resultData = await Promise.all(
      dataIds.map(async (id) => {
        const fetchUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const myInit = {
          mode: 'no-cors',
        };
        const fetchRequest = new Request(fetchUrl, myInit);
        const jsonDetailData = await hangarFetch(`hacker-news-new-detail-${id}`, fetchRequest)
        return jsonDetailData
      })
    ) 
    setStories(resultData)
    setHeader('New Stories')
    setLoading(false)
  }, [])

  const hackerData = stories.length > 0 ? stories.map((story) => (
      <HackerBar key={story.id} story={story} />
  )): null

  return (
    <>
       <div className='flex flex-row items-center mt-8 px-4 py-6 justify-center' id="hacker-frame">
          <SidePane />
         {!loading ? ( <div className='flex-auto px-12 py-10'>
            {header !== '' ? (
              <h2 className='text-primary text-4xl mb-4'>{header} </h2>
            ) : null}
            {hackerData}
          </div>) : <Loader />}
        </div>
        <Dashboard />
    </>
  )
}

export default Hackernews
