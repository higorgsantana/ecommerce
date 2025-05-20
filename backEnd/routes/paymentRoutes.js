import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: false,
})

const router = express.Router()

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body

    const paymentIntent = await stripe.paymentIntent.create({
      amount: amount * 100,
      currency: 'brl',
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
