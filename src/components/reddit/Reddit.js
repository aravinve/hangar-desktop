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

  const searchArticleFunction = () => {
    loadArticle(searchArticle);
  }

  const redditData = articles.map((post) => (
    <>
      <RedditBar key={post.data.id} post={post} />
    </>
  ))

  return (
    <>
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchArticle={searchArticleFunction}
          />
          <div className='flex-auto flex flex-col justify-center mt-4'>
            {searchArticle !== '' ? (
              <div className='bg-primary text-secondary text-md p-1 rounded-md shadow-md mb-4 text-center w-1/4 truncate capitalize select-none'>
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
