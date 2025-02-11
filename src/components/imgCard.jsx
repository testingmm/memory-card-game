import React from 'react'

const ImageCard = ({ imgData, onClickImage }) => {

    const handleOnClickImage = (id) => {
        onClickImage(id);
    }
    return (
        <>
            <div className='card' style={{ cursor: 'pointer' }} onClick={() => handleOnClickImage(imgData.id)}>
                <img src={imgData.largeImageURL} alt='{imgData.title}' />
                <div className='card-body'>
                    <h4 className='text-center'>{imgData.name}</h4>
                </div>
            </div>
        </>
    )
}

export default ImageCard