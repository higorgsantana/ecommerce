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

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .lean()

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Nenhum pedido encontrado' })
    }

    res.status(200).json(orders)
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
})

router.post('/', async (req, res) => {
  try {
    console.log('Recebendo solicitação de novo pedido...')
    console.log('Corpo da requisição:', req.body)

    const { userId, items, total, shippingAddress } = req.body

    if (!userId || !items || !total || !shippingAddress) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    const expectedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    if (Math.abs(total - expectedTotal) > 1) {
      return res.status(400).json({
        error: `Total inconsistente. Esperado: ${expectedTotal}, recebido: ${total}`,
      })
    }

    const newOrder = new Order({
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      shippingAddress,
      status: 'pendente',
    })

    console.log('Novo pedido a ser salvo:', newOrder)

    const savedOrder = await newOrder.save()
    res.status(201).json({
      message: 'Pedido criado com sucesso',
      orderId: savedOrder._id,
    })
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao criar o pedido' })
  }
})

export default router
