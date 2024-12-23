import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Erro ao buscar Produtos', error)
      })
  }, [])
  const handleAddToCart = (productId) => {
    axios
      .post('http://localhost:5000/api/cart', { productId, quantity: 1 })
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => {
        console.error('Erro ao adicionar ao carrinho', error)
      })
  }

  return (
    <div>
      <h1>Produtos</h1>
      <div style={{ display: 'flex', gap: '16px' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
