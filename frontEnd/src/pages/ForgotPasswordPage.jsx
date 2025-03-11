import React, { useState } from 'react'
import { Button, Form, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await resetPassword(email)
      setMessage(
        'Verifique sua caixa de entrada para instruções de recuperação',
      )
      setError('')
    } catch (err) {
      setError('Falha ao enviar email: ' + err.message)
      setMessage('')
    }
  }

  return (
    <Container
      className="d-flex flex-column align-items-center pt-5"
      style={{ maxWidth: '400px', minHeight: 'calc(100vh - 200px)' }}
    >
      <h2 className="mb-4">Recuperar Senha</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="sucess">{message}</Alert>}
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Enviar Instruções
        </Button>

        <div className="text-center">
          Lembrou sua senha? <Link to="/login">Faça Login</Link>
        </div>
      </Form>
    </Container>
  )
}

export default ForgotPasswordPage
