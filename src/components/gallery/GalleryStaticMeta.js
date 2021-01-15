function GalleryStaticMeta({image, downloadAllowed}) {
    return (
        <div className="flex-1 flex flex-col justify-center">
        <div className="flex-1 bg-secondary rounded-r-sm p-4 flex flex-row text-primary">
        <div className="flex-auto">
                <div className="mt-1 mb-1 capitalize">
                    {image.userImageURL !== "" ? (<img src={image.userImageURL} className="rounded-full h-10 w-10 items-center justify-center inline-flex mr-1" alt="avatarpixauser"/>) : <i className="fas fa-user mr-2"></i>}
                        <span className="ml-1 text-xl capitalize">{image.user}</span>
                </div>
                <div className="mt-1 mb-1 capitalize text-md px-2 py-1">
                    <i className="fas fa-photo-video mr-2"></i> {image.type}
                </div>
                <div className="flex flex-row mt-1 mb-1">
                    {image.tags.split(",").map(element => (
                        <div className='flex-shrink-0 bg-primary text-secondary px-2 py-1 rounded-sm m-1 select-none text-sm'>
                        <i className='fas fa-tag mr-2'></i>
                        {element}
                    </div>
                    ))}
                </div>
                <div className="flex-1 mt-1 mb-1 text-lg px-1 py-2">
                    <i className="fas fa-star mr-2"></i> Pixabay Ratings
                </div>
                <div className="flex-1 bg-secondary rounded-r-sm flex flex-row text-primary text-sm">
                    <div className="flex-auto px-4 py-0">
                        <div className="mt-1 mb-1">
                            <i className="fas fa-thumbs-up mr-2"></i> {image.likes}
                        </div>
                        <div className="mt-1 mb-1">
                            <i className="fas fa-comment mr-2"></i>  {image.comments}
                        </div>
                        <div className="mt-1 mb-1">
                            <i className="fas fa-eye mr-2"></i> {image.views}
                        </div>
                    </div>
            </div>
            </div>
            <div className="flex-auto flex flex-col items-start bg-secondary rounded-r-sm p-4">
                {downloadAllowed ? (<a
                href={image.largeImageURL}
                className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none m-2' download>
                <i className="fas fa-download ml-1 mr-1"></i>Download
            </a>):null }
            <button
                className='bg-primary cursor-pointer text-secondary text-sm p-1 rounded-sm focus:outline-none m-2'>
                <i className="fas fa-heart ml-1 mr-1"></i>Add to Favourites
            </button>
        </div>
        </div>
    </div>
    )
}

export default GalleryStaticMeta
