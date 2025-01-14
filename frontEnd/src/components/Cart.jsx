import React from 'react'
import { useCart } from '../assets/context/CartContext'
import Button from './Button'

const Cart = () => {
  const { cart, increase, decrease } = useCart()
  console.log('Carrinho na página cart:', cart)

  return (
    <div style={{ padding: '20px' }}>
      <h2>Meu Carrinho</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              <strong>{product.name}</strong> - R$ {product.price.toFixed(2)}
              <br />
              Quantidade: {product.quantity}
              <div>
                <Button onClick={() => increase(product.id)}>+</Button>
                <Button onClick={() => decrease(product.id)}>-</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart
