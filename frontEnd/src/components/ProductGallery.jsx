import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ProductGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const imagesArray = typeof images === 'string' ? [images] : images

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <div className="border rounded-3 overflow-hidden">
            <img
              src={imagesArray[activeIndex]}
              alt="Imagem principal"
              className="img-fluid"
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'contain',
                background: '#f8f9fa',
              }}
            />
          </div>
        </Col>
      </Row>

      <Row className="g-2">
        {imagesArray.map((img, index) => (
          <Col xs={3} key={index}>
            <div
              role="button"
              className={`border rounded-2 p-1 ${activeIndex === index ? 'border-primary' : 'border-secondary'}`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={img}
                alt={`Miniatura  ${index + 1}`}
                className="img-fluid"
                style={{ width: '100%', height: '100px', objectFit: 'contain' }}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

ProductGallery.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
}

export default ProductGallery
