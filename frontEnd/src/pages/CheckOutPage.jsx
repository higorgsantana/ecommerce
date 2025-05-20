import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '../components/PaymentForm'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CheckOutPage = () => {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
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
          quantity: item.quantity,
          price: item.price,
        })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        shippingAddress: formData,
      }

      await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      clearCart()
    } catch (error) {
      console.error('Erro no checkout: ', error)
    }
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Rua</Form.Label>
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
              <Form.Label>Estado</Form.Label>
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
              <Form.Label>CEP</Form.Label>
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
        </Col>

        <Col md={6}>
          <Card className="p-3">
            <h4>Resumo do Pedido</h4>
            {cart.map((item) => (
              <div key={item.id}>
                <p>
                  {item.name} x {item.quantity}
                </p>
                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <hr />
            <h5>
              Total: R${' '}
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </h5>
            <Elements stripe={stripePromise}>
              <PaymentForm
                total={cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                )}
                onSucess={handleOrderSubmission}
                shippingAddress={formData}
              />
            </Elements>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckOutPage
