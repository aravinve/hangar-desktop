import { useState, useEffect } from 'react';
import Article from './Article';
import SidePane from './SidePane';
import Dashboard from '../home/Dashboard';
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function News() {
  const [articles, setArticles] = useState([])
  const [searchArticle, setSearchArticle] = useState('')
  const [searchCountry, setSearchCountry]  = useState('us')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false) 

  useEffect(() => {
    setLoading(true)
    loadArticle(searchArticle, searchCountry);
  }, [])

  const loadArticle = async (searchTerm, searchCountry) => {
    const apiUrl = 'https://newsapi.org/v2'
    const apiKey = process.env.REACT_APP_NEWS_KEY
    let testURL = '';
    if (searchTerm.length > 0) {
      testURL = `${apiUrl}/everything?q=${searchTerm}&apikey=${apiKey}`;
    } else {
      testURL = `${apiUrl}/top-headlines?country=${searchCountry}&apikey=${apiKey}`;
    }
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    const key = searchArticle !== '' ? `news-${searchCountry}-${searchArticle}` : `news-${searchCountry}`
    const newsArticles = await hangarFetch(key, myRequest)
    await setArticles(newsArticles.articles)
    if(newsArticles.totalResults === 0){
      setAlert(true)
    } else{
      setAlert(false)
    }
    setLoading(false)
  }

  const handleSearchChange = (e) => {
    setSearchArticle(e.target.value)
    setAlert(false)
    if (e.target.value === '') {
      setArticles([])
    }
  }

  const handleSelectChange = (e) => {
    setSearchCountry(e.target.value)
    setAlert(false)
  }

  const searchArticleFunction = () => {
    loadArticle(searchArticle, searchCountry);
  }

  const articlesData = articles !== null ? articles.map((article) => (
            <Article
              key={article.publishedAt}
              article={article}
            />
          ))
        : null

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{searchArticle.concat(' not available!!!')} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different article keyword!!!'} </h2>
  </div>) : null

  return (
    <>
      <div className='flex flex-row items-center mt-56 mb-8 px-4 py-6 justify-center'>
          <SidePane
            handleSearchChange={handleSearchChange}
            handleSelectChange={handleSelectChange}
            searchArticle={searchArticleFunction}
          />
          <div className='flex-auto flex flex-col mt-4 mb-4 justify-center container'>
            {!loading ? articlesData : <Loader />}
            {alertMessage}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default News
