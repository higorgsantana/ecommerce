import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'
import PropTypes from 'prop-types'

const PaymentForm = ({ onSuccess }) => {
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
    setError('')

    if (!stripe || !elements || !clientSecret) {
      setError('Configuração de pagamento incompleta')
      setLoading(false)
      return
    }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              postal_code: 'CEP_COLETADO_NO_FORMULARIO',
            },
          },
        },
      })

      if (result.error) {
        setError(result.error.message)
      } else {
        console.log('Pagamento realizado com sucesso', result.paymentIntent)
        if (result.paymentIntent.status === 'succeeded') {
          if (onSuccess) {
            onSuccess(true)
          }
        } else {
          setError('Pagamento não foi concluido com sucesso')
        }
      }
    } catch (err) {
      console.error('Erro: ', err)
      setError('Erro durante o processamento do pagamento')
    } finally {
      setLoading(false)
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

PaymentForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default PaymentForm
