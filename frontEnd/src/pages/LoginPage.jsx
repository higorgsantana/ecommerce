import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Alert, Spinner } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, signInWithGoogle, signInWithGithub } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const toastId = toast.loading('Fazendo login...', {
        position: 'bottom-right',
      })

      await login(email, password)

      toast.update(toastId, {
        render: `Bem-vindo, ${email}!`,
        type: `success`,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      })

      navigate(location.state?.from || '/')
    } catch (err) {
      toast.dismiss()
      toast.error(`Falha no login: ${err.message}`, {
        position: 'bottom-right',
      })

      setError('Falha no login: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true)
      setError('')
      const toastId = toast.loading(`Entrando com ${provider}...`, {
        position: 'bottom-right',
      })

      if (provider === 'google') await signInWithGoogle()
      if (provider === 'github') await signInWithGithub()

      toast.update(toastId, {
        render: 'Login realizado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      })

      navigate(location.state?.from || '/')
    } catch (err) {
      toast.dismiss()
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error(`Erro no login social: ${err.message}`, {
          position: 'bottom-right',
        })
        setError('Erro no login social: ' + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  console.log('useAuth:', useAuth())

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Container
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center"
        style={{ maxWidth: '400px', paddingBottom: '11rem' }}
      >
        <h2 className="mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : '  Entrar'}
          </Button>

          <div className="text-center mt-3">
            Não tem conta? <Link to="/register">Crie uma agora</Link>
          </div>
        </Form>

        <div className="mt-4 w-100">
          <div className="text-center mb-3">Ou entre com:</div>

          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-dark"
              onClick={() => handleSocialLogin('google')}
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '50px', height: '50px' }}
            >
              <FcGoogle size={24} />
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => handleSocialLogin('github')}
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '50px', height: '50px' }}
            >
              <FaGithub size={24} />
            </Button>
          </div>

          <div className="text-center mt-3">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoginPage
