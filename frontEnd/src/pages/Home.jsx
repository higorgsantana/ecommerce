import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products')
        console.log('Produtos recebidos do backend', response.data)
        setProducts(response.data)
      } catch (error) {
        console.error('Erro ao buscar os produtos', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Produtos</h1>
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
