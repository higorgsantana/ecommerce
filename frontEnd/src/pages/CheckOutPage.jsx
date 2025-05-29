import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'
import PaymentForm from '../components/PaymentForm'
import '../assets/styles/components/CheckOutPage.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const CheckOutPage = () => {
  const { cart, clearCart, cartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  })

  const handleOrderSubmission = async (paymentSucess) => {
    if (!paymentSucess) return

    try {
      const orderData = {
        userId: user.uid,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        shippingAddress: formData,
      }

      console.log('Enviando pedido para o backend:', orderData)

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()
      console.log('Resposta do backEnd: ', data)

      navigate('/profile')

      clearCart()
    } catch (error) {
      console.error('Erro no checkout: ', error)
    }
  }

  return (
    <Container
      className="min-vh-100 d-flex align-items-center"
      style={{ maxWidth: '1200px' }}
    >
      <Row className="w-100 g-4">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4">Informações de Entrega</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Rua *</Form.Label>
                <Form.Control
                  name="street"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cidade *</Form.Label>
                <Form.Control
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado *</Form.Label>
                <Form.Control
                  name="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CEP *</Form.Label>
                <Form.Control
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm h-100">
            <h3 className="mb-4">Resumo do Pedido</h3>
            <div
              className="mb-4"
              style={{ maxHeight: '300px', overflowY: 'auto' }}
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">x {item.quantity}</small>
                  </div>
                  <div>
                    <span className="text-primary">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-3">
              <h5 className="d-flex justifyt-content-between mb-4">
                <span>Total:</span>
                <span className="text-success">
                  R$ {(cartTotal / 100).toFixed(2)}
                </span>
              </h5>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  total={cartTotal}
                  onSuccess={handleOrderSubmission}
                  shippingAddress={formData}
                />
              </Elements>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckOutPage
