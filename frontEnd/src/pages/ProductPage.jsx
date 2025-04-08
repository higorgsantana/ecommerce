import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import ProductGallery from '../components/ProductGallery'
import ProductSpecs from '../components/ProductSpecs'
import { useCart } from '../context/CartContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Você precisa estar logado para adicionar itens ao carrinho!')
      navigate('/login')
      return
    }
    addToCart(product)
  }

  if (!id) {
    return <Alert variant="warning">ID do produto não especificado</Alert>
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = parseInt(id, 10)

        if (isNaN(productId)) {
          throw new Error('ID inválido')
        }

        const response = await fetch(`http://localhost:5000/api/products/${id}`)

        if (!response.ok) throw new Error('Produto não encontrado')

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Erro ao carregar o produto')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
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
          <ProductGallery images={product.image} />
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
              <Button variant="primary" size="lg" onClick={handleAddToCart}>
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Descrição */}
      <Row className="mt-5">
        <Col>
          <div className="bg-light p-4 rounded-3">
            <h3 className="mb-4 border-bottom pb-2">Descrição do Produto</h3>
            <div
              className="description-content"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {product.description}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductPage
