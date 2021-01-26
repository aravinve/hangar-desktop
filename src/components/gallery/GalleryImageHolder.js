import loaderDark from '../../img/loader_dark.gif'
import loaderLight from '../../img/loader_light.gif'

function GalleryImageHolder({subloading, image, handleImageLoad}) {
    const userPreferredData = JSON.parse(localStorage.getItem('userPreferedData'))
    const targetLoader = userPreferredData['theme'] ? loaderDark : loaderLight
    return (
        <div className="flex-1 w-full flex items-center justify-center">
            <img src={subloading ? targetLoader : image.largeImageURL} className={subloading ? "rounded-sm mt-4 w-16 h-16": image.type === "vector/svg" ? "bg-secondary rounded-sm": "rounded-sm"} onLoad={handleImageLoad} alt={image.pageURL} />
        </div>
    )
}

export default GalleryImageHolder
