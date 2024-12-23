const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

app.use(cors())

app.use(bodyParser.json())

let products = [
  {
    id: 1,
    name: 'product 1',
    price: 19.99,
    imageUrl: 'http://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'product 2',
    price: 29.99,
    imageUrl: 'http://via.placeholder.com/150',
  },
]

let cart = []

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body
  const product = products.find((p) => p.id === productId)

  if (product) {
    const itemInCart = cart.find((item) => item.productId === productId)

    if (itemInCart) {
      itemInCart.quantity += quantity
    } else {
      cart.push({ productId, quantity })
    }
    res.status(200).json({ massage: 'Produto adicionado ao carrinho' })
  } else {
    res.status(404).json({ massage: 'Produto não encontrado' })
  }
})

app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id)
  cart = cart.filter((item) => item.productId !== productId)
  res.status(200).json({ message: 'Produto removido do carrinho' })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`)
})
