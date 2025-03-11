import React, { useState } from 'react'
import { Button, Form, Container, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setError('Erro no cadastro: ' + err.message)
    }
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Container
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center"
        style={{ maxWidth: '400px', paddingBottom: '11rem' }}
      >
        <h2 className="mb-4">Criar Conta</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Cadastrar
          </Button>

          <div className="text-center">
            Já tem conta? <Link to="/login">Faça login</Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default RegisterPage
