import { useState, useEffect } from 'react';
import Article from './Article';
import SidePane from './SidePane';
import ContentFrame from './ContentFrame';
import Dashboard from '../home/Dashboard';

function News() {
  const [articles, setArticles] = useState([])
  const [searchArticle, setSearchArticle] = useState('')
  const [searchCountry, setSearchCountry]  = useState('us')
  const [contentData, setContentData] = useState('')
  const [contentUrl, setContentUrl] = useState('')

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

  const activateContentFrame = (content, url) => {
    setContentData(content)
    setContentUrl(url)
  }

  const articlesData = articles != null ? articles.map((article) => (
            <Article
              key={article.publishedAt}
              article={article}
              activateContentFrame={activateContentFrame}
            />
          ))
        : null;

  return (
    <>
      <div className='columns'>
          <SidePane
            handleSearchChange={handleSearchChange}
            handleSelectChange={handleSelectChange}
            searchArticle={searchArticleFunction}
          />
          <div className='column is-6' style={{ marginTop: '4rem' }}>
            {articlesData}
          </div>
          <ContentFrame
            contentData={contentData}
            contentUrl={contentUrl}
          />
        </div>
        <Dashboard />
    </>
  )
}

export default News
