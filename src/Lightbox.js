import React, { useState } from 'react'
import './Lightbox.css'

export default function Lightbox() {
    const [navIndex, setNavIndex] = useState(0)
    const arrayOfUrls = [
        "https://source.unsplash.com/6pZ1CR95-LE",
        "https://source.unsplash.com/mCdMERfagEI",
        "https://source.unsplash.com/s7JMSQ4DA4g",
        "https://source.unsplash.com/P7Tn-_IbrKI",
        "https://source.unsplash.com/M7WlI-YPWt0",
        "https://source.unsplash.com/c6g-26myD34",
        "https://source.unsplash.com/05KfSHkfupg",
        "https://source.unsplash.com/HjpNeUD8qdw",
        "https://source.unsplash.com/GZjXMTQAfB4",
        "https://source.unsplash.com/Y0nU6dqDCbY",
    ]
    const len = arrayOfUrls.length
    const buffer = 5

    // True modulo helper function
    // (JavaScript's % operator is actually REMAINDER and does not handle negative values as expected)
    const mod = (n, m) => (n % m + m) % m

    // Algorithmically generate image and its surrounding images,
    // automatically transitioning based on navIndex. 
    const generateImageAndBuffers = () => {
        return [...Array(buffer)].map((e,i) => {
            const offset = mod(-navIndex - (buffer+1)/2 + i, buffer) - (buffer-1)/2
            return <img alt="" key={i} 
                src={ arrayOfUrls[ mod(navIndex + offset, len) ] } 
                style={{ 
                    opacity: mod(navIndex, buffer) === i ? 1 : 0,
                    pointerEvents: mod(navIndex, buffer) === i ? 'auto' : 'none',
                    transform: `translateX(calc(${offset} * 50vw))`,
                }} />
        })
    }

    return (
        <div className="flex-container">
            <div className="flex-header">
                Header
            </div>
            <div className="flex-body">
                <div className="nav-left-pane" onClick={() => setNavIndex( mod(navIndex - 1, len * buffer) )}>
                    <div className="nav-left-arrow">
                        <i className="fas fa-angle-left fa-4x"></i>
                    </div>
                </div>
                <div className="nav-right-pane" onClick={() => setNavIndex( mod(navIndex + 1, len * buffer) )}>
                    <div className="nav-right-arrow">
                        <i className="fas fa-angle-right fa-4x"></i>
                    </div>
                </div>
                { generateImageAndBuffers() }
            </div>
            <div className="flex-footer-1">
                Footer 1
            </div>
            <div className="flex-footer-2">
                Footer 2
            </div>
        </div>
    )
}

/*

// Single Image
<img alt="" src={arrayOfUrls[navIndex]} />


// 3 images with buffering and opacity
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 2, 3) - 1, len) ] } 
    style={{ opacity: mod(navIndex, 3) === 0 ? 1 : 0 }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 1, 3) - 1, len) ] } 
    style={{ opacity: mod(navIndex, 3) === 1 ? 1 : 0 }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 0, 3) - 1, len) ] } 
    style={{ opacity: mod(navIndex, 3) === 2 ? 1 : 0 }} />


// 5 image with buffering and opacity
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 3, 5) - 2, len) ] } 
    style={{ opacity: mod(navIndex, 5) === 0 ? 1 : 0 }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 2, 5) - 2, len) ] } 
    style={{ opacity: mod(navIndex, 5) === 1 ? 1 : 0 }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 1, 5) - 2, len) ] } 
    style={{ opacity: mod(navIndex, 5) === 2 ? 1 : 0 }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 0, 5) - 2, len) ] } 
    style={{ opacity: mod(navIndex, 5) === 3 ? 1 : 0 }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 4, 5) - 2, len) ] } 
    style={{ opacity: mod(navIndex, 5) === 4 ? 1 : 0 }} />


// 5 images with buffering, opacity and translation
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 3, 5) - 2, len) ] } 
    style={{ 
        opacity: mod(navIndex, 5) === 0 ? 1 : 0,
        transform: `translateX(calc(${ mod(-navIndex - 3, 5) - 2 } * 50vw))`,
    }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 2, 5) - 2, len) ] } 
    style={{ 
        opacity: mod(navIndex, 5) === 1 ? 1 : 0,
        transform: `translateX(calc(${ mod(-navIndex - 2, 5) - 2 } * 50vw))`,
    }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 1, 5) - 2, len) ] } 
    style={{ 
        opacity: mod(navIndex, 5) === 2 ? 1 : 0,
        transform: `translateX(calc(${ mod(-navIndex - 1, 5) - 2 } * 50vw))`,
    }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 0, 5) - 2, len) ] } 
    style={{ 
        opacity: mod(navIndex, 5) === 3 ? 1 : 0,
        transform: `translateX(calc(${ mod(-navIndex - 0, 5) - 2 } * 50vw))`,
    }} />
<img alt="" src={ arrayOfUrls[ mod(navIndex + mod(-navIndex - 4, 5) - 2, len) ] } 
    style={{ 
        opacity: mod(navIndex, 5) === 4 ? 1 : 0,
        transform: `translateX(calc(${ mod(-navIndex - 4, 5) - 2 } * 50vw))`,
    }} />


// DRY map function, dealer's choice amount of images with buffering, opacity and translation.    
const generateImageAndBuffers = () => {
    const buffer = 5;
    return [...Array(buffer)].map((e,i) => {
        const offset = mod(-zoomIndex - (buffer+1)/2 + i, buffer) - (buffer-1)/2
        return <img alt="" key={i} src={ generateImageUrl(filteredDishes[ mod(zoomIndex + offset, len) ]?.image) } style={
            { 
                opacity: mod(zoomIndex, buffer) === i ? 1 : 0,
                pointerEvents: mod(zoomIndex, buffer) === i ? 'auto' : 'none',
                transform: `translateX(calc(${offset} * 50vw))`,
            }} />
    })
}

*/