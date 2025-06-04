import express from 'express'
import Product from '../models/ProductModels.js'
import mongoose from 'mongoose'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error('erro: ' + error.message)
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q?.trim()
    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            $options: 'i',
          },
        },
        {
          description: {
            $regex: searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            $options: 'i',
          },
        },
      ],
    })
    res.json(
      products.length > 0 ? products : { message: 'Nenhum produto encontrado' },
    )
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro na busca' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    let product

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      product = await Product.findById(req.params.id)
    } else if (!isNaN(req.params.id)) {
      product = await Product.findOne({ id: parseInt(req.params.id) })
    }

    if (!product) {
      return res.status(400).json({ error: 'Produto não encontrado' })
    }

    res.json(product)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Formato de ID inválido' })
    }
    res.status(500).json({ error: 'Erro ao buscar produto' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    console.error('Erro: ', error.message)
    res.status(400).json({ error: 'Dados inválidos' })
  }
})

export default router
