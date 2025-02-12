import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import PropTypes from 'prop-types'
import '../assets/styles/cartIcon.css'

const CartIcon = ({ mobile }) => {
  const { cartItems } = useCart()
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (cartItems.length > 0) {
      setBounce(true)
      const timer = setTimeout(() => setBounce(false), 500)
      return () => clearTimeout(timer)
    }
  }, [cartItems.length])

  return (
    <div className={`cart-icon ${mobile ? 'mobile' : ''}`}>
      <i className={`bi bi-cart-fill fs-4 ${bounce ? 'bounce' : ''}`}></i>
      {cartItems.length > 0 && (
        <span className="cart-counter">{cartItems.length}</span>
      )}
    </div>
  )
}

CartIcon.propTypes = {
  mobile: PropTypes.bool,
}

export default CartIcon
