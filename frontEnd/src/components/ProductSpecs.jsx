import React from 'react'
import PropTypes from 'prop-types'

const ProductSpecs = ({ specs }) => {
  if (!specs || Object.keys(specs).length === 0) return null

  return (
    <div className="bg-light p-4 rounded-3 mb-4">
      <h4 className="mb-4">Especificações Técnicas</h4>
      <dl className="row">
        {Object.entries(specs).map(
          ([key, value]) =>
            value && (
              <div className="col-md-6 mb-3" key={key}>
                <dt className="text-secondary">{key}</dt>
                <dd className="col-sm-8">{value}</dd>
              </div>
            ),
        )}
      </dl>
    </div>
  )
}

ProductSpecs.propTypes = {
  specs: PropTypes.object,
}

export default ProductSpecs
