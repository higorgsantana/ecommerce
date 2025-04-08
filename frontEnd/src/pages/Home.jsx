import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import '../assets/styles/components/home.css'

function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useDocumentTitle('PC Store - Loja de Eletrônicos')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('http://localhost:5000/api/category'),
          fetch('http://localhost:5000/api/products'),
        ])

        if (!categoriesRes.ok || !productsRes.ok) {
          throw new Error('Erro ao carregar dados')
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesRes.json(),
          productsRes.json(),
        ])

        setCategories(categoriesData)
        setProducts(productsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

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
