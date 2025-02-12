import React from 'react'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import products from '../data/products.json'
import categories from '../data/categories.json'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { Container, Row, Col } from 'react-bootstrap'
import '../assets/styles/components/home.css'

function Home() {
  useDocumentTitle('PC Store - Loja de Eletrônicos')

  return (
    <Container className="my-5">
      {/*Destaques*/}
      <section className="mb-5" aria-labelledby="destaque-title">
        <h2 className="text-center mb-4">Destaques</h2>
        <Row className="g-4 justify-content-center">
          {products.slice(0, 4).map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>

      {/*Categorias*/}
      <section className="mb-5" aria-labelledby="categorias-title">
        <h2 className="text-center mb-4">Categorias</h2>
        <Row className="g-4 justify-content-center">
          {categories.map((category) => (
            <Col key={category.id} xs={12} sm={6} md={4} lg={3}>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </section>

      {/*Produtos*/}
      <section className="mb-5" aria-labelledby="produtos-title">
        <h2 className="text-center mb-4">Produtos</h2>
        <Row className="g-4 justify-content-center">
          {products.slice(0, 4).map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}

export default Home
