import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-bootstrap'

const ProductGallery = ({ image }) => {
  const images = Array.isArray(image) ? image : [image]
  const [mainImage, setMainImage] = useState(0)
  const [zoomStyle, setZoomStyle] = useState({})
  const imageContainerRef = useRef(null)

  const validImages = images.filter(
    (img) => img && typeof img === 'string' && img.trim() !== '',
  )

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100

    setZoomStyle({
      backgroundImage: `url(${validImages[mainImage]})`,
      backgroundPosition: `${x}% ${y}%`,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ opacity: 0 })
  }

  if (validImages.length === 0) {
    return (
      <div
        className="bg-light rounded d-flex align-items-center justify-content-center"
        style={{ height: '400px' }}
      >
        <p className="text-muted">Sem imagens disponíveis</p>
      </div>
    )
  }

  return (
    <div className="product-gallery">
      <div
        ref={imageContainerRef}
        className="main-image mb-3 overflow-hidden position-relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ height: '400px', cursor: 'zoom-in' }}
      >
        <Image
          src={validImages[mainImage]}
          alt="Imagem do produto"
          fluid
          className="w-100 h-100 object-fit-contain"
          onError={(e) => {
            e.target.onerror = null
            e.target.src =
              'https://via.placeholder.com/400?text=Imagem+não+encontrada'
          }}
        />

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: zoomStyle.backgroundImage,
            backgroundSize: '200%',
            backgroundPosition: zoomStyle.backgroundPosition,
            opacity: zoomStyle.opacity || 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
        />
      </div>

      {validImages.length > 1 && (
        <div className="d-flex gap-2 flex-wrap">
          {validImages.map((img, index) => (
            <div
              key={index}
              className={`thumbnail border rounded p-1 ${mainImage === index ? 'border-primary border-2' : ''}`}
              style={{ width: '80px', height: '80px', cursor: 'pointer' }}
              onClick={() => setMainImage(index)}
            >
              <Image
                src={img}
                alt={`Miniatura ${index + 1}`}
                fluid
                className="w-100 h-100 object-fit-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/80?text=Erro'
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

ProductGallery.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
}

export default ProductGallery
