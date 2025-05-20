import express from 'express'
import Order from '../models/OrderModels.js'

const router = express.Router()

router.get('/:firebaseId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.firebaseId })
    res.json(orders)
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, items, total, shippingAddress } = req.body

    const newOrder = new Order({
      userId,
      items,
      total,
      shippingAddress,
    })

    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao criar o pedido' })
  }
})

export default router
