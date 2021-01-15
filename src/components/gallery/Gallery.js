import {useState, useEffect} from 'react'
import Dashboard from '../home/Dashboard'
import hangarFetch from '../../HangarFetch'
import SidePane from './SidePane'
import GalleryGrid from './GalleryGrid'
import GalleryDetailImage from './GalleryDetailImage'
import Loader from '../../Loader'

function Gallery() {
  const [searchText, setSearchText] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [subloading, setSubloading] = useState(false)
  const [modal, setModal] = useState({
    display: false,
    data: null
  })
  const [alert, setAlert] = useState(false)
  const [galleryMode, setGalleryMode] = useState('')

  const loadSelectData = (e) => {
    if(e.target.value !== ''){
     setGalleryMode(e.target.value)
     setImages([])
     setAlert(false)
     setSearchText('')
    }
  }

  const handleChange = (e) => {
    setSearchText(e.target.value)
    setAlert(false)
    if(e.target.value === ''){
      setImages([])
    }
  }

  const loadImages = async (searchTerm) => {
    const apiUrl = galleryMode === "photo" ? "https://pixabay.com/api/" : "https://pixabay.com/api/videos/"
    const apiKey = process.env.REACT_APP_PIXABAY_KEY
    const limit = 30
    const myRequest = `${apiUrl}/?key=${apiKey}&q=${searchTerm}&image_type=all&per_page=${limit}&safeSearch=true`
    const imagesFetch = await hangarFetch(`pixabay-${galleryMode}-${searchTerm}`, myRequest)
    const imagesArray = await imagesFetch.hits
    console.log(imagesArray)
    if(imagesArray.length > 0){
      setImages(imagesArray)
      setAlert(false)
    } else {
      setAlert(true)
    }
    setLoading(false)
  }

  const searchKeyword = () => {
    if(searchText !== ''){
      setLoading(true)
      loadImages(searchText)
    } else {
      setAlert(true)
    }
  }

  const handleImageClick = (image) => {
    if(!modal.display){
      setSubloading(true)
      setModal({
        display: true,
        data: image
      })
    }
  }

  const handleImageLoad = () => {
    setSubloading(false)
  }

  const closeModal = () => {
    setSubloading(false)
    setModal({
      display: false,
      data: null
    })
  }

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{searchText !== '' ? searchText.concat(' not available!!!') : 'Keyword is Empty. Cannot Search.'} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different keyword!!!'} </h2>
  </div>) : null
  
  return (
    <>
        <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
        <SidePane 
          handleChange={handleChange}
          searchKeyword={searchKeyword}
          loadSelectData={loadSelectData}
          searchText={searchText}
        />
        <div className='flex-auto flex flex-col justify-center mt-16'>        {!loading ? (<div
            className='flex-auto flex flex-col justify-center'>
              <GalleryGrid images={images} handleImageClick={handleImageClick} galleryMode={galleryMode} />
              {modal.display && modal.data ? (<GalleryDetailImage subloading={subloading} image={modal.data} handleImageLoad={handleImageLoad} closeModal={closeModal} galleryMode={galleryMode} />) : null}
        </div>): <Loader /> }
        {alertMessage}
        </div>
        </div>
        <Dashboard />
      </>
  )
}

export default Gallery
