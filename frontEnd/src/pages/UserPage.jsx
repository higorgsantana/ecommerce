import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  ListGroup,
  Badge,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserPage = () => {
  const { user, updateUserProfile, logOut } = useAuth()
  const [userData, setUserData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formValues, setFormValues] = useState({
    displayName: user?.displayName || '',
    phoneNumber: '',
    photoURL: '',
  })
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      console.log('UID do firebase: ', user?.uid)
      try {
        setLoading(true)

        if (!user || !user.uid) {
          throw new Error('Usuário não autenticado')
        }

        const userRes = await fetch(
          `http://localhost:5000/api/users/${user.uid}`,
        )

        if (!userRes.ok) {
          throw new Error(`Erro HTTP: ${userRes.status}`)
        }

        const userData = await userRes.json()

        if (!userData) {
          throw new Error('Dados do usuário não encotrados')
        }

        const ordersRes = await fetch(
          `http://localhost:5000/api/orders/${user.uid}`,
        )
        if (!ordersRes.ok) {
          throw new Error(`Erro HTTP: ${ordersRes.status}`)
        }
        const ordersData = await ordersRes.json()

        setUserData(userData)
        setFormValues({
          displayName: user.displayName || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
        })
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      } catch (error) {
        console.error('Erro detalhado: ', error)
        setError('Erro ao carregar dados: ' + error.message)
        setUserData(null)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchData()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')

      if (formValues.displayName !== user.displayName) {
        await updateUserProfile({ displayName: formValues.displayName })
      }

      const updateRes = await fetch(
        `http://localhost:5000/api/users/${user.uid}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: formValues.phoneNumber,
            address: formValues.address,
          }),
        },
      )

      if (!updateRes.ok) throw new Error('Falha ao atualizar dados')

      const updateData = await updateRes.json()
      setUserData(updateData)
      setEditMode(false)
    } catch (error) {
      setError(error.message)
    }
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'entregue':
        return 'success'
      case 'processando':
        return 'warning'
      case 'cancelado':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  if (!user) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning" className="mb-4">
          Você precisa estar logado para acessar esta página
        </Alert>
        <div
          className="d-grid gap-3"
          style={{ maxWidth: '300px', margin: '0 auto' }}
        >
          <Link to="/login" className="btn btn-primary">
            Fazer Login
          </Link>
          <Link to="/register" className="btn btn-outline-primary">
            Criar Conta
          </Link>
        </div>
      </Container>
    )
  }

  if (loading || !userData) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p className="mt-2">Carregando seus dados...</p>
      </div>
    )
  }

  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* Coluna do Perfil */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {user.displayName || 'Meu Perfil'}
              </Card.Title>

              {editMode ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.displayName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          displayName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formValues.phoneNumber}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="(00) 00000-0000"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formValues.address}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          address: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Salvar Alterações
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Email:</strong>
                      {user.email}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong>Telefone:</strong>{' '}
                      {userData?.phoneNumber || 'Não informado'}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong>Endereço:</strong>
                      {userData?.address || 'Não informado'}
                    </ListGroup.Item>
                  </ListGroup>

                  <div className="d-grid gap-2 mt-4">
                    <Button
                      variant="outline-primary"
                      onClick={() => setEditMode(true)}
                    >
                      Editar Perfil
                    </Button>
                    <Button variant="outline-danger" onClick={logOut}>
                      Sair
                    </Button>
                  </div>
                </>
              )}

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Coluna de Pedidos */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">Histórico de Pedidos</Card.Title>

              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                </div>
              ) : orders.length === 0 ? (
                <Alert variant="info" className="text-center">
                  Nenhum pedido encontrado. <br />
                  <Link to="/" className="btn btn-primary mt-3">
                    Ver Produtos
                  </Link>
                </Alert>
              ) : (
                <ListGroup variant="flush">
                  {orders.map((order) => (
                    <ListGroup.Item key={order._id} className="py-3">
                      <Row className="align-items-center">
                        <Col md={8}>
                          <div className="d-flex align-items-center gap-3">
                            <div className="bg-light rounded p-2">
                              <span className="text-muted">
                                Pedido #{order._id.slice(-6).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h6 className="mb-1">
                                {new Date(order.createdAt).toLocaleDateString(
                                  'pt-BR',
                                  {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  },
                                )}
                              </h6>
                              <small className="text-muted">
                                {order.items.reduce(
                                  (sum, item) => sum + item.quantity,
                                  0,
                                )}{' '}
                                item(ns)
                              </small>
                            </div>
                          </div>
                        </Col>

                        <Col md={4} className="text-md-end mt-2 mt-md-0">
                          <div className="d-flex flex-column gap-1">
                            <Badge
                              bg={getStatusBadge(order.status)}
                              className="align-self-end"
                            >
                              {order.status}
                            </Badge>
                            <span className="h5 mb-0">
                              {order.total.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserPage
