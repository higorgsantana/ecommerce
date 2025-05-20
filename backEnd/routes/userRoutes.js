import express from 'express'
import User from '../models/UserModel.js'

const router = express.Router()

router.get('/:firebaseId', async (req, res) => {
  try {
    console.log('Recebida requisição para:', req.params.firebaseId)
    const user = await User.findOne({ firebaseId: req.params.firebaseId })
    if (!user) {
      console.log('Usuário não encontrado para ID:', req.params.firebaseId)
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    console.log('Usuário encontrado: ', user)
    res.json(user)
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
})

router.put('/:firebaseId', async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { firebaseId: req.params.firebaseId },
      req.body,
      { new: true },
    )
    res.json(updateUser)
  } catch (error) {
    console.error('Erro: ', error)
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { firebaseId, email, displayName } = req.body

    const newUser = new User({
      firebaseId,
      email,
      displayName,
      createdAt: new Date(),
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao criar usuário',
      details: error.message,
    })
  }
})

export default router
