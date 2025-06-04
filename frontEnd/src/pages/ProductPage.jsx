import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import ProductGallery from '../components/ProductGallery'
import ProductSpecs from '../components/ProductSpecs'
import { useCart } from '../context/CartContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProductReviews from '../components/ProductReviews'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()
  const { user: currentUser, loading: authLoading } = useAuth()
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`http://localhost:5000/api/products/${id}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Produto não encontrado')
        }

        const data = await response.json()
        setProduct(data)

        const mockReviews = []
        setReviews(mockReviews)
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

  const handleAddToCart = () => {
    if (authLoading) return

    if (!currentUser) {
      alert('Você precisa estar logado para adicionar itens ao carrinho!')
      navigate('/login', { state: { from: `/product/${id}` } })
      return
    }
    if (product) {
      addToCart(product)
    }
  }

  if (!id) {
    return <Alert variant="warning">ID do produto não especificado</Alert>
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    )
  }

  if (!product) {
    return (
      <Alert variant="warning" className="m-3">
        Produto não encontrado
      </Alert>
    )
  }

  return (
    <Container className="my-5 px-4">
      <Row className="g-5">
        {/* Galeria */}
        <Col lg={6} className="mb-4">
          <ProductGallery image={product.image} />
        </Col>

        {/* Informações */}
        <Col lg={6} className="d-flex flex-column">
          <div className="bg-white p-4 rounded-4 shadow-sm h-100">
            <h1 className="mb-3 fw-bold">{product.name}</h1>

            <div className="d-flex align-items-center mb-4">
              <h2 className="text-sucess mb-0 me-2">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </h2>
              {product.oldPrice && (
                <span className="text-muted text-decoration-line-through">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.oldPrice)}
                </span>
              )}
            </div>

            <ProductSpecs specs={product.specs} />

            <div className="mt-auto pt-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="w-100 fw-bold d-flex align-items-center justify-content-center py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="me-2"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Descrição */}
      <Row className="mt-4">
        <Col>
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h3 className="mb-4 pb-2 border-bottom">Descrição do Produto</h3>
            <div
              className="description-content fs-5"
              style={{ lineHeight: '1.8' }}
            >
              {product.description}
            </div>

            {/*Avaliação*/}
            <div className="mt-5 pt-3 border-top">
              <h4 className="mb-4">Avaliações dos Clientes</h4>
              <ProductReviews reviews={reviews} productId={id} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductPage
