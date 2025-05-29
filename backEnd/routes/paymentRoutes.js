import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router()

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body
    console.log('Recebendo solicitação de PaymentIntent. Amount:', amount)

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Valor inválido' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'brl',
      payment_method_types: ['card'],
    })

    console.log('PaymentIntent criado:', paymentIntent.id)
    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Erro no Stripe:', error.message)
    res.status(500).json({ error: error.message || 'Erro interno' })
  }
})

export default router
