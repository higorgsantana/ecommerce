import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import axios from 'axios'

/* eslint-disable react/prop-types */

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  console.log('CartProvider renderizado!')
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const persistCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  useEffect(() => {
    persistCart(cart)
  }, [cart])

  const addToCart = async (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id)
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    try {
      await axios.post('http://localhost:5000/api/cart', {
        productId: product.id,
        quantity: 1,
      })
    } catch (error) {
      console.error('erro ao adicionar o produto:', error)
    }
  }

  const increase = useCallback((id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }, [])

  const decrease = (id) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0), // Remove o produto se a quantidade for 0 ou menor
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
