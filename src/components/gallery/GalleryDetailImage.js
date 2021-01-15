import React from 'react'
import GalleryImageHolder from './GalleryImageHolder'
import GalleryStaticMeta from './GalleryStaticMeta'
import GalleryVideoHolder from './GalleryVideoHolder'

function GalleryDetailImage({subloading, image, handleImageLoad, closeModal, galleryMode}) {
    const modalStyle = {
        top: '2rem',
        left: '0rem',
        zIndex: '9',
        height: '500px'
    }
    return (
        <div className="fixed w-screen overflow-hidden" style={modalStyle}>
            <div className="flex flex-row justify-end mt-1 mr-8 mb-3">
                <div className="text-secondary bg-primary rounded-full h-10 w-10 items-center justify-center text-lg cursor-pointer flex" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
             <div className="flex flex-row justify-center" id={image.id}>
                 {galleryMode === 'photo' ? (<GalleryImageHolder image={image} subloading={subloading} handleImageLoad={handleImageLoad} />) : (<GalleryVideoHolder video={image.videos.medium} />)}
                <GalleryStaticMeta image={image} downloadAllowed={galleryMode === 'photo'} />
             </div>
        </div>
    )
}

export default GalleryDetailImage
