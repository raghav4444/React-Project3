import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'
import './App.css'

const PAGE_SIZE = 12
const API_URL = 'https://picsum.photos/v2/list'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchPhotos = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${PAGE_SIZE}`)
      setPhotos(response.data)
    } catch (error) {
      setErrorMessage('Could not load photos. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [page])

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleRefresh = () => {
    fetchPhotos()
  }

  return (
    <div className="app-shell ">
      <div className="app-glow" aria-hidden="true" />

      <main className="content">
        <header className="glass-panel header">
          <div>
            <p className="eyebrow">Glass Gallery</p>
            <h1>Modern Photo Gallery</h1>
            <p className="text-muted">
            Browse a curated collection of stunning, high-resolution images. Effortlessly navigate pages, refresh for new inspiration, and enjoy a seamless gallery experience powered by modern web technologies.
            </p>
          </div>

          <div className="header-meta">
            <span className="badge">Page {page}</span>
            <span className="text-muted">Showing {photos.length} photos</span>
          </div>

          <div className="header-actions">
            <button
              className="glass-button"
              onClick={handlePrevious}
              disabled={page === 1}
            >
              Previous
            </button>
            <button className="glass-button primary" onClick={handleNext}>
              Next
            </button>
            <button className="glass-button ghost" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </header>

        <section className="glass-panel gallery-panel">
          {isLoading && <div className="status-message">Loading photos...</div>}
          {!isLoading && errorMessage && (
            <div className="status-message error">{errorMessage}</div>
          )}
          {!isLoading && !errorMessage && (
            <div className="grid-gallery">
              {photos.map((photo) => (
                <Card key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </section>

        <footer className="footer text-muted">
          Built with React and Picsum Photos. Click a card to open the original.
        </footer>
      </main>
    </div>
  )
}

export default App