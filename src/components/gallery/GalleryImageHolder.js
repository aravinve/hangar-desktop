import loader from '../../img/loader.gif'

function GalleryImageHolder({subloading, image, handleImageLoad}) {
    return (
        <div className="flex-1 w-full flex items-center justify-center">
            <img src={subloading ? loader : image.largeImageURL} className={subloading ? "rounded-sm mt-4 w-16 h-16": image.type === "vector/svg" ? "bg-secondary rounded-sm": "rounded-sm"} onLoad={handleImageLoad} alt={image.pageURL} />
        </div>
    )
}

export default GalleryImageHolder
