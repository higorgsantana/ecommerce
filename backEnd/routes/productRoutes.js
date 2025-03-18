const express = require('express')
const router = express.Router()
const Product = require('../models/ProductModel')

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error('erro: ' + error.message)
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10)

    if (isNaN(productId)) {
      return res.status(400).json({ error: 'ID deve ser um número' })
    }
    const product = await Product.findOne({ id: productId })

    if (!product) {
      return res.status(404).json({ error: 'Product não encontrado' })
    }

    res.json(product)
  } catch (error) {
    console.error('Erro: ', error.message)
    res.status(500).json({
      error: 'Erro ao buscar produto',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

router.post('/', async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    console.error('Erro: ', error.message)
    res.status(400).json({ error: 'Dados inválidos' })
  }
})

module.exports = router
