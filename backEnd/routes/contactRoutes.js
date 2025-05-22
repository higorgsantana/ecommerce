import express from 'express'
import Contact from '../models/ContactModel.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' })
    }

    const newContact = new Contact({
      name,
      email,
      subject: subject || 'Sem assunto',
      message,
      createdAt: new Date(),
    })

    await newContact.save()
    res.status(200).json({ message: 'Mensagem recebida com sucesso!' })
  } catch (error) {
    console.error('Erro no backend (Contato):', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router
