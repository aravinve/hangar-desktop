import {useState} from 'react'
import Dashboard from '../home/Dashboard'
import SidePane from './SidePane'
import WikiCard from './WikiCard'
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Wikipedia() {
  const [articles, setArticles] = useState('')
  const [searchArticle, setSearchArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  const loadArticle = async (searchTerm) => {
    if (searchTerm !== '') {
      const testURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json`;
      const myInit = {
        mode: 'no-cors',
      };
      const myRequest = new Request(testURL, myInit)
      const wikiArticles = await hangarFetch(`wiki-${searchTerm}`, myRequest)
      if(wikiArticles.length <= 0 || wikiArticles[1].length <= 0){
        setAlert(true)
        setArticles([])
      } else{
        await setArticles(wikiArticles)
        setAlert(false)
      }
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setAlert(false)
    setSearchArticle(e.target.value)
    if (e.target.value === '') {
      setArticles([])
    }
  };

  const searchArticleFunction = () => {
    if(searchArticle !== ''){
      setLoading(true)
      loadArticle(searchArticle)
    } else {
      setAlert(true)
    }
  }

  let wikiHeader = ''
  let requiredArray = []
  if (articles !== '' && articles.length > 0) {
    wikiHeader = articles[0]
    const wikiCardHeader = articles[1]
    const wikiUrls = articles[3]
    requiredArray = wikiUrls.map((wikiUrl, index) => {
      return { name: wikiCardHeader[index], url: wikiUrl }
    });
  }

  const articlesData = requiredArray.map((data) => (
    <WikiCard key={data.name} name={data.name} url={data.url} />
  ))

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{searchArticle !== '' ? searchArticle.concat(' not available!!!') : 'Article Keyword is Empty. Cannot Search.'} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different article!!!'} </h2>
  </div>) : null

  return (
    <>
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchArticle={searchArticleFunction}
          />
          <div className='flex-auto flex flex-col justify-center mt-4'>
            <div className='flex-1 flex flex-row mt-1 mb-1 p-2'>
              <div className='flex-auto'>
                <h4 className='text-4xl text-primary capitalize'>{wikiHeader} </h4>
              </div>
            </div>
            {!loading ? articlesData : (<Loader />)}
            {alertMessage}
          </div>
        </div>
        <Dashboard />
    </>
  )
}

export default Wikipedia