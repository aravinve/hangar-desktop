function GalleryVideoHolder({video}) {
    return (
        <div className="flex-1 w-full flex items-center justify-center">
           <video className="outline-none focus:outline-none" src={video.url} controls width={video.width} height={video.height}></video>
        </div>
    )
}

export default GalleryVideoHolder
