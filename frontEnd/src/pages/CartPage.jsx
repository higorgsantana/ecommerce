import React from 'react'
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Seu carrinho está vazio 😢</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Continuar Comprando
        </Link>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8}>
          <h2 className="mb-4">Seu Carrinho</h2>
          {cart.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={6}>
                    <h5>{item.name}</h5>
                    <p>
                      Preço unitário:{' '}
                      {item.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col md={3} className="text-end">
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id, item.name)}
                    >
                      <FaTrash />
                    </Button>
                    <p className="mt-2">
                      Subtotal:{' '}
                      {(item.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h5>Resumo do pedido</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>
                    {calculateTotal().toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Frete:</span>
                  <span>Grátis</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>
                    {calculateTotal().toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </ListGroup.Item>
              </ListGroup>
              <Button
                as={Link}
                to="/checkout"
                variant="primary"
                className="w-100 mt-3"
              >
                Finalizar Compra
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage
