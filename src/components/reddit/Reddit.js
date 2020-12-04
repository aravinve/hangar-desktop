import  { useState } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import RedditBar from './RedditBar';

function Reddit() {
  const [articles, setArticles] = useState([])
  const [searchArticle, setSearchArticle] = useState('')

  const loadArticle = (searchTerm) => {
    const apiUrl = 'https://www.reddit.com/r'
    const testURL = `${apiUrl}/${searchTerm}.json`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(data.data.children)
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const handleChange = (e) => {
    setSearchArticle(e.target.value)
  }

  const searchArticle = () => {
    loadArticle(searchArticle);
  }

  const redditData = articles.map((post) => (
    <>
      <RedditBar key={post.data.id} post={post} />
    </>
  ))

  return (
    <>
      <div className='columns'>
          <SidePane
            handleChange={handleChange}
            searchArticle={searchArticle}
          />
          <div className='column is-9' style={{ marginTop: '4rem' }}>
            {searchArticle !== '' ? (
              <div className='tag is-black' style={{ marginBottom: '1rem' }}>
                Subreddit: {searchArticle}
              </div>
            ) : null}
            {redditData}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Reddit
