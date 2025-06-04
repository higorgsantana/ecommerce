import React from 'react'
import PropTypes from 'prop-types'

const ProductSpecs = ({ specs }) => {
  if (!specs || Object.keys(specs).length === 0) return null

  return (
    <div className="specs-container border rounded-3 p-4 mb-4">
      <h4 className="mb-4 pb-2 border-bottom d-flex align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="me-2"
        >
          <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
          <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
        </svg>
        Especificações Técnicas
      </h4>

      <div className="row">
        {Object.entries(specs).map(
          ([key, value]) =>
            value && (
              <div className="col-md-6 mb-3" key={key}>
                <div className="d-flex">
                  <dt
                    className="text-secondary pe-2 flex-shrink-0"
                    style={{ width: '180px' }}
                  >
                    {key}
                  </dt>
                  <dd className="flex-grow-1">{value}</dd>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  )
}

ProductSpecs.propTypes = {
  specs: PropTypes.object,
}

export default ProductSpecs
