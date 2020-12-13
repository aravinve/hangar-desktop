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

  const searchArticleFunction = () => {
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
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchArticle={searchArticleFunction}
          />
          <div className='flex-auto flex flex-col justify-center mt-4'>
            <div className='flex-1 flex flex-row'>
              <div className='flex-auto'>
                <h4 className='text-4xl text-primary capitalize'>{wikiHeader} </h4>
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