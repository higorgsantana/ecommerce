import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import cors from 'cors'

const app = express()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro de conexão ao MongoDB:', err))

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT'],
  }),
)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.removeHeader('Permissions-Policy')
  res.removeHeader('Feature-Policy')
  next()
})

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/contact', contactRoutes)

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
