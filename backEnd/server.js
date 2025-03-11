require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')
const app = express()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado com MongoDB'))
  .catch((err) => console.error('Erro de conexão: ', err))

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
