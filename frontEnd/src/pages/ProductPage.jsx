import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import ProductGallery from '../components/ProductGallery'
import ProductSpecs from '../components/ProductSpecs'
import { useCart } from '../context/CartContext'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`)
        if (!response.ok) throw new Error('Produto não encontrado')
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

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
      <Row className="g-5">
        {/* Galeria */}
        <Col lg={6}>
          <ProductGallery images={product.images} />
        </Col>

        {/* Informações */}
        <Col lg={6}>
          <div className="d-flex flex-column h-100">
            <h1 className="mb-3">{product.name}</h1>
            <h2 className="text-sucess mb-4">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </h2>

            <ProductSpecs specs={product.specs} />

            <div className="mt-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => addToCart(product)}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Descrição */}
      <Row className="mt-5">
        <Col>
          <h3 className="mb-3">Descrição do Produto</h3>
          <p className="text-secondary">{product.description}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductPage
