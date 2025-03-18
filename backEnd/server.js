const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado com MongoDB'))
  .catch((err) => console.error('Erro de conexão: ', err))

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
