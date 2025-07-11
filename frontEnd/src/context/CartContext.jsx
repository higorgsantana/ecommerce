import PropTypes from 'prop-types'
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { toast } from 'react-toastify'

const CartContext = createContext()

const initialState = []

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        return [...state, { ...action.payload, quantity: 1 }]
      }
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => item.id !== action.payload.id)
    }

    case 'CLEAR_CART': {
      return []
    }

    case 'INIT_CART': {
      return action.payload
    }

    case 'UPDATE_QUANTITY': {
      return state.flatMap((item) => {
        if (item.id === action.payload.productId) {
          const newQuantity = Math.max(0, action.payload.newQuantity)
          return newQuantity > 0 ? [{ ...item, quantity: newQuantity }] : []
        }
        return [item]
      })
    }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)
  const { user } = useAuth()
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * 100 * item.quantity,
    0,
  )

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'CLEAR_CART' })
      localStorage.removeItem('cart')
    }
  }, [user])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      dispatch({ type: 'INIT_CART', payload: JSON.parse(savedCart) })
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, user])

  const addToCart = (product) => {
    if (!user) {
      toast.error('Faça login para adicionar itens ao carrinho  ')
      return { error: 'Usuário não logado' }
    }
    dispatch({ type: 'ADD_ITEM', payload: product })
    toast.success(`${product.name} adicionado ao carrinho!`)
    return { success: true }
  }

  const updateQuantity = (productId, newQuantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, newQuantity },
    })
  }

  const removeFromCart = (productId, productName) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: productId } })
    toast.info(`${productName} removido do carrinho`)
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart: (productId, productName) =>
          removeFromCart(productId, productName),
        updateQuantity,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
