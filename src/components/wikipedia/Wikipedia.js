import {useState} from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import WikiCard from './WikiCard';

function Wikipedia() {
  const [articles, setArticles] = useState('')
  const [searchArticle, setSearchArticle] = useState('')

  const loadArticle = (searchTerm) => {
    if (searchTerm !== '') {
      const testURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json`;
      const myInit = {
        mode: 'no-cors',
      };
      const myRequest = new Request(testURL, myInit);
      fetch(myRequest)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setArticles(data)
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  }

  const handleChange = (e) => {
    setSearchArticle(e.target.value)
  };

  const searchArticle = () => {
    loadArticle(searchArticle);
  }

  let wikiHeader = '';
  let requiredArray = [];
  if (articles !== '') {
    wikiHeader = articles[0];
    const wikiCardHeader = articles[1];
    const wikiUrls = articles[3];
    requiredArray = wikiUrls.map((wikiUrl, index) => {
      return { name: wikiCardHeader[index], url: wikiUrl };
    });
  }

  const articlesData = requiredArray.map((data) => (
    <WikiCard key={data.name} name={data.name} url={data.url} />
  ));

  return (
    <>
      <div className='columns'>
          <SidePane
            handleChange={handleChange}
            searchArticle={searchArticle}
          />
          <div className='column is-6' style={{ marginTop: '4rem' }}>
            <div className='columns'>
              <div className='column'>
                <h4 className='is-title'>{wikiHeader} </h4>
              </div>
            </div>
            {articlesData}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Wikipedia