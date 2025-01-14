import React, { useState } from 'react'
import Button from './Button'
import { useCart } from '../assets/context/CartContext'

/* eslint-disable react/prop-types */
export const ProductCard = ({ id, name, price, imageUrl }) => {
  const { addToCart } = useCart()
  const [buttonFeedback, setButtonFeedback] = useState(false)

  const handleAddToCart = () => {
    addToCart({ id, name, price, imageUrl })

    setButtonFeedback(true)
    setTimeout(() => setButtonFeedback(false), 2000)
  }

  const displayPrice =
    price !== undefined ? `R$ ${price.toFixed(2)}` : 'Preço Indisponível'

  return (
    <div
      className="product-card"
      style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
    >
      <img
        src={imageUrl}
        alt={name || 'Produto'}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
      <h3>{name || 'Produto sem nome'}</h3>
      <p>{displayPrice}</p>
      <Button
        onClick={handleAddToCart}
        disabled={!id || !price || buttonFeedback}
      >
        {buttonFeedback ? 'Adicionado' : 'Adicionar ao Carrinho'}
      </Button>
    </div>
  )
}

export default ProductCard
