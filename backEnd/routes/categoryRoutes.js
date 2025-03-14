const express = require('express')
const router = express.Router()
const Category = require('../models/CategoryModels')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    console.error('Erro:', error.message)
    res
      .status(500)
      .json({
        error: 'Erro ao buscar categorias',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      })
  }
})

module.exports = router
