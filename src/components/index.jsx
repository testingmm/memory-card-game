import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ImageCard from './imgCard';
import Score from './score';

function addRelevantName(data) {
    const usedNames = new Set();
    return data.map(item => {
        const tags = item.tags.split(',').map(tag => tag.trim());
        let relevantName = '';
        const specificTags = tags.filter(tag => tag.length > 0 && tag.split(' ').length === 1 && tag !== 'flower' && tag !== 'yellow');
        if (specificTags.length > 0) {
            relevantName = specificTags[0];
        } else {
            const phraseTags = tags.filter(tag => tag.length > 0 && tag.split(' ').length > 1);
            if (phraseTags.length > 0) {
                relevantName = phraseTags[0];
            } else {
                relevantName = item.user;
            }
        }
        let uniqueName = relevantName;
        let counter = 1;
        while (usedNames.has(uniqueName)) {
            uniqueName = `${relevantName} (${counter})`;
            counter++;
        }

        usedNames.add(uniqueName);

        return {
            ...item,
            name: uniqueName,
        };
    });
}

function randomizeArray(arr) {
    const arrayCopy = [...arr];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
}

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [clickedImages, setClickedImages] = useState([]);

    useEffect(() => {
        axios.get('https://pixabay.com/api/?key=48779113-cc027bc4dd8079962799caf43&q=yellow+flowers&image_type=photo&pretty=true').then((response) => {
            let data = addRelevantName(response.data.hits.slice(0, 12))
            setImages(data);
        })
    }, []);

    const handleImageSelection = (imageId) => {
        if (imageId) {
            if (clickedImages.includes(imageId)) {
                if (score > highScore) {
                    setHighScore(score)
                }
                setScore(0);
                setClickedImages([]);
            } else {
                setScore(score + 1);
                setClickedImages([...clickedImages, imageId]);
            }

            let shuffledImages = randomizeArray(images);
            setImages(shuffledImages);
        }
    }

    return (
        <>
            <Score score={score} highScore={highScore} />
            <div className='row container-fluid p-5'>
                {images && images.length > 0 && images.map((img, index) => {
                    return <div className='col-3 mb-2'>
                        <ImageCard key={index} imgData={img} onClickImage={handleImageSelection} />
                    </div>
                })}
            </div>
        </>
    )
}

export default ImageGallery