import express from 'express'
import Product from '../models/ProductModels.js'
import Category from '../models/CategoryModels.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    console.error('Erro: ', error.message)
    res.status(500).json({ error: 'Erro ao buscar categorias' })
  }
})

router.get('/:categoryId', async (req, res) => {
  try {
    console.log('ID recebido:', req.params.categoryId)

    const categoryId = parseInt(req.params.categoryId)
    console.log('ID convertido:', categoryId)

    const category = await Category.findOne({ id: categoryId })
    console.log('Categoria encontrada:', category)

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    res.json(category)
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao buscar categoria' })
  }
})

router.get('/:categoryId/products', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId)

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'ID da categoria inválido' })
    }

    const products = await Product.find({ categoryId: categoryId })

    res.json(products)
  } catch (error) {
    console.error('Erro: ', error.message)
    res.status(500).json({ error: 'Erro ao buscar produtos da categoria' })
  }
})

export default router
