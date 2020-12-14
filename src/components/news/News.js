import { useState, useEffect } from 'react';
import Article from './Article';
import SidePane from './SidePane';
import Dashboard from '../home/Dashboard';

function News() {
  const [articles, setArticles] = useState([])
  const [searchArticle, setSearchArticle] = useState('')
  const [searchCountry, setSearchCountry]  = useState('us')
  const [toggleFrame, setToggleFrame] = useState(false)  

  useEffect(() => {
    loadArticle(searchArticle, searchCountry);
  }, [])

  const loadArticle = (searchTerm, searchCountry) => {
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
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles)
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const handleSearchChange = (e) => {
    setSearchArticle(e.target.value)
  };

  const handleSelectChange = (e) => {
    setSearchCountry(e.target.value)
  }

  const searchArticleFunction = () => {
    loadArticle(searchArticle, searchCountry);
  };

  const activateContentFrame = () => {
    setToggleFrame(!toggleFrame)
  }

  const articlesData = articles != null ? articles.map((article) => (
            <Article
              key={article.publishedAt}
              article={article}
              toggleFrame={toggleFrame}
            />
          ))
        : null;

  return (
    <>
      <div className='flex flex-row items-center mt-56 mb-8 px-4 py-6 justify-center'>
          <SidePane
            handleSearchChange={handleSearchChange}
            handleSelectChange={handleSelectChange}
            searchArticle={searchArticleFunction}
            activateContentFrame={activateContentFrame}
            toggleFrame={toggleFrame}
          />
          <div className='flex-auto flex flex-col mt-4 mb-4 justify-center container'>
            {articlesData}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default News
