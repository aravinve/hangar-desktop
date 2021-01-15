function GalleryGrid({images, handleImageClick, galleryMode}) {
    return (
        <div className="grid grid-cols-3 justify-items-center items-center gap-2 p-4">
            {
                images.map(image => (
                    <>
                    <div className='transform hover:scale-110 cursor-pointer' key={image.id} onClick={() => handleImageClick(image)}>
                        {galleryMode === "photo" ? 
                        (<img src={image.previewURL} className="rounded-sm" alt={image.pageURL} />)
                        :
                        (<img src={`https://i.vimeocdn.com/video/${image.picture_id}_295x166.jpg`}className="rounded-sm" alt={image.pageURL} />)
                     }
                    </div>
                    </>
                ))
            }
        </div>
    )
}

export default GalleryGrid;
