import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

const SearchResultsPage = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const searchParams = new URLSearchParams(location.search)
        const query = searchParams.get('q')

        const response = await fetch(
          `http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`,
        )
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Erro na busca')
        }

        const data = await response.json()
        setResults(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    searchProducts()
  }, [location.search])

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />
  if (error)
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    )

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        Resultados para: {new URLSearchParams(location.search).get('q')}
      </h2>
      <Row>
        {results.length > 0 ? (
          results.map((product) => (
            <Col key={product._id} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Alert variant="info">Nenhum produto encontrado</Alert>
        )}
      </Row>
    </Container>
  )
}

export default SearchResultsPage
