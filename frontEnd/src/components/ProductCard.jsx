import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

/* eslint-disable react/prop-types */
function ProductCard({ name, price, imageUrl, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p>Preço: R$ {price.toFixed(2)}</p>
      <Button onClick={onAddToCart} className="add-to-cart-btn">
        Adicionar ao Carrinho
      </Button>
    </div>
  )
}

ProductCard.PropTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
}

ProductCard.defaultProps = {
  onAddToCart: undefined,
}

export default ProductCard
