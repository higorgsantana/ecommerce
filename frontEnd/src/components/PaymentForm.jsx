import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { cartTotal } = useCart()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/payment/create-payment-intent',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: cartTotal }),
          },
        )

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Erro: ', err)
        setError('Erro ao configurar pagamento')
      }
    }

    if (cartTotal > 0) fetchClientSecret()
  }, [cartTotal])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      setError('Stripe não carregado corretamente')
      return
    }

    const { error: stripeError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      },
    )

    setLoading(false)

    if (stripeError) {
      setError(stripeError.message)
    } else {
      alert('Pagamento realizado com sucesso')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={!stripe || loading}
      >
        {loading ? 'Processando...' : 'Pagar R$' + (cartTotal / 100).toFixed(2)}
      </button>
    </form>
  )
}

export default PaymentForm
