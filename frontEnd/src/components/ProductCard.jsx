import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product, isCategoryPage }) => {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!user) {
      alert('Faça login primeiro!')
      navigate('/login')
      return
    }
    addToCart(product)
  }

  return (
    <Card
      className={`h-100 shadow-sm ${isCategoryPage ? 'p-3 border-2' : 'p-2'}`}
    >
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className={isCategoryPage ? 'p-3' : 'p-2'}
          style={{
            height: isCategoryPage ? '220px' : 200,
            objectFit: 'contain',
          }}
        />
        <Card.Body className={'d-flex flex-column'}>
          <Card.Title
            className={`text-center ${isCategoryPage ? 'mb-4' : 'mb-2'}`}
          >
            {product.name}
          </Card.Title>
          <Card.Text className="text-center text-sucess fw-bold mb-3">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.price)}
          </Card.Text>
        </Card.Body>
      </Link>
      <Button
        variant="primary"
        className="mx-3 mb-3"
        onClick={handleAddToCart}
        aria-label={`Adicionar ${product.name} ao carrinho`}
      >
        Adicionar ao carrinho
      </Button>
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isCategoryPage: PropTypes.bool,
}

ProductCard.defaultProps = {
  isCategoryPage: false,
}

export default ProductCard
