import React from 'react'

const Card = ({ photo }) => {
    const authorName = photo.author || 'Unknown artist'

    return (
        <a className="glass-card" href={photo.url} target="_blank" rel="noreferrer">
            <div className="card-image">
                <img
                    src={photo.download_url}
                    alt={`Photo by ${authorName}`}
                    loading="lazy"
                />
            </div>
            <div className="card-body">
                <h3>{authorName}</h3>
                <span className="card-link">Open on Picsum →</span>
            </div>
        </a>
    )
}

export default Card