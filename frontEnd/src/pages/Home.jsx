import React from 'react'
import ProductCard from '../components/ProductCard'

function Home() {
  const handleAddCart = (productName) => {
    alert(`${productName} Adicionado ao carrinho!`)
  }

  return (
    <div>
      <h1>Produtos</h1>
      <div style={{ display: 'flex', gap: '16px' }}>
        <ProductCard
          name="Produto 1"
          price={19.99}
          imageUrl="http://via.placeholder.com/150"
          onAddToCart={() => handleAddCart('produto 1')}
        />
        <ProductCard
          name="Produto 2"
          price={29.99}
          imageUrl="http://via.placeholder.com/150"
          onAddToCart={() => handleAddCart('produto 2')}
        />
      </div>
    </div>
  )
}

export default Home
