import { useState, useEffect } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import HackerBar from './HackerBar';

function Hackernews() {
  const [header, setHeader] = useState('')
  const [stories, setStories] = useState([])
  
  useEffect(() => {
    const testURL = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const dataIds = data.slice(0, 10);
        dataIds.map((id) => {
          const fetchUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
          const myInit = {
            mode: 'no-cors',
          };
          const fetchRequest = new Request(fetchUrl, myInit);
          fetch(fetchRequest)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setStories(stories.concat(data))
              setHeader('New Stories')
            });
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }, [])

  const hackerData = stories.length > 0 ? stories.map((story) => (
            <HackerBar key={story.id} story={story} />
          )): null;

  return (
    <>
       <div className='columns'>
          <SidePane />
          <div className='column is-9' style={{ marginTop: '4rem' }}>
            {header !== '' ? (
              <h2 className='is-title'>{header} </h2>
            ) : null}
            {hackerData}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Hackernews
