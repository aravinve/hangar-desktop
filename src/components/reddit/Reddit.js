import  { useState } from 'react'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import RedditBar from './RedditBar'
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Reddit() {
  const [articles, setArticles] = useState([])
  const [searchArticle, setSearchArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [subredditData, setSubredditData] = useState(null)

  const loadArticle = async (searchTerm) => {
    const apiUrl = 'https://www.reddit.com/r'
    const testURL = `${apiUrl}/${searchTerm}.json`
    const myInit = {
      mode: 'no-cors',
    }
    const myRequest = new Request(testURL, myInit)
    const redditBlogs = await hangarFetch(`reddit-${searchTerm}`, myRequest)
    if(redditBlogs['data'] !== undefined && redditBlogs.data.children.length > 0){
      await setArticles(redditBlogs.data.children)
      const singlePost = await redditBlogs.data.children[0].data
      const subredditObject = {
        name: singlePost.subreddit,
        type: singlePost.subreddit_type,
        subscribers: singlePost.subreddit_subscribers
      }
      setSubredditData(subredditObject)
      setAlert(false)
    } else{
      setAlert(true)
      setSubredditData(null)
      setArticles([])
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setAlert(false)
    setSearchArticle(e.target.value)
    if(e.target.value === ''){
      setArticles([])
      setSubredditData(null)
    }
  }

  const searchArticleFunction = () => {
    if(searchArticle !== ''){
      setLoading(true)
      loadArticle(searchArticle)
    }else{
      setAlert(true)
      setSubredditData(null)
    }
  }

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{searchArticle !== '' ? searchArticle.concat(' not available!!!') : 'Subreddit is Empty. Cannot Search.'} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different subreddit!!!'} </h2>
  </div>) : null

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
          <div className='flex-auto flex flex-col justify-center mt-10'>
            {searchArticle !== '' && subredditData !== null ? (
             <div className='flex-auto flex flex-row'>
               <div className='bg-primary text-secondary text-md p-1 rounded-md shadow-md mb-4 text-center w-1/4 truncate capitalize select-none m-1'>
                Subreddit: {subredditData.name}
              </div>
              <div className='bg-primary text-secondary text-md p-1 rounded-md shadow-md mb-4 text-center w-1/4 truncate capitalize select-none m-1'>
              Subscribers: {subredditData.subscribers}
            </div>
            <div className='bg-primary text-secondary text-md p-1 rounded-md shadow-md mb-4 text-center w-1/4 truncate capitalize select-none m-1'>
            Type: {subredditData.type}
          </div>
             </div>
            ) : null}
             {!loading ? (<div className='flex flex-col justify-center'>
              {redditData}
            </div>) : <Loader /> }
            {alertMessage}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Reddit
