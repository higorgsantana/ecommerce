import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const { name, email, message } = formData
    if (!name || !email || !message) {
      setError('Preencha todos os campos obrigatórios.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const response = await axios.post(
        'http://localhost:5000/api/contact',
        formData,
      )
      if (response.status === 200) {
        setSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (err) {
      console.error('Erro', err.message)
      setError('Erro ao enviar mensagem. Tente novamente mais tarde.')
    }
  }

  return (
    <Container className="my-5">
      <h2>Entre em Contato</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Mensagem enviada com sucesso!</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assunto</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mensagem *</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  )
}

export default ContactPage
