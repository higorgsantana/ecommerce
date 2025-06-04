import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Alert, Card } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const ProductReviews = ({ reviews, productId }) => {
  const { user } = useAuth()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [localReviews, setLocalReviews] = useState(reviews || [])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true)
        setLocalReviews(reviews || [])
      } catch (err) {
        console.error('Erro: ', err)
        setError('Erro ao carregar as avaliações')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId, reviews])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('Você precisar estar logado para avaliar produtos')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const newReview = {
        id: Date.now(),
        userId: user.uid,
        userName: user.displayName || 'Usuário Anônimo',
        userAvatar: user.photoURL || '',
        rating,
        comment,
        date: new Date().toISOString(),
      }

      setLocalReviews([newReview, ...localReviews])
      setComment('')
      setRating(5)
      setShowReviewForm(false)
      setError('Avaliação enviada com sucesso!')
      setTimeout(() => setError(''), 3000)
    } catch (err) {
      setError('Erro ao enviar avaliação: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating =
    localReviews.length > 0
      ? (
          localReviews.reduce((sum, review) => sum + review.rating, 0) /
          localReviews.length
        ).toFixed(1)
      : 0

  const renderReviewForm = () => (
    <Card className="mb-4 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Avaliar este produto</h5>
          <Button
            variant="link"
            onClick={() => setShowReviewForm(false)}
            className="text-danger p-0"
          >
            Cancelar
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Sua Nota:</Form.Label>
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant={star <= rating ? 'warning' : 'outline-secondary'}
                  className="me-2 p-0 d-flex align-items-center justify-content-center"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                  }}
                  onClick={() => setRating(star)}
                  type="button"
                >
                  {star <= rating ? '★' : '☆'}
                </Button>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Comentário:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Conte sua experiência com o produto..."
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              disabled={submitting || !comment.trim()}
              className="px-4 py-2"
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Enviando...
                </>
              ) : (
                'Enviar Avaliação'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )

  const renderEmptyReviews = () => (
    <Card className="text-center py-4 border-0 bg-light">
      <Card.Body>
        <div className="mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#6c757d"
            viewBox="0 0 16 16"
          >
            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
        </div>
        <p className="text-muted mb-3">
          Este produto ainda não possui avaliações
        </p>
        {user && !showReviewForm && (
          <Button
            variant="primary"
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2"
          >
            Seja o primeiro a avaliar
          </Button>
        )}
      </Card.Body>
    </Card>
  )

  const renderReviewsList = () => (
    <div className="review-list">
      {localReviews.map((review) => (
        <Card key={review.id} className="mb-3 border-0 shadow-sm">
          <Card.Body className="p-3">
            <div className="d-flex">
              {review.userAvatar ? (
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="rounded-circle me-3"
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#e9ecef',
                  }}
                >
                  <span className="text-muted fs-5 fw-bold">
                    {review.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between mb-2 align-items-center">
                  <strong>{review.userName}</strong>
                  <span className="text-muted small">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="text-warning mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>

                <p className="mb-0">{review.comment}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  )

  const renderAddReviewButton = () =>
    user &&
    !showReviewForm && (
      <div className="text-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => setShowReviewForm(true)}
          className="px-4 py-2"
        >
          Deixar sua Avaliação
        </Button>
      </div>
    )

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p>Carregando avaliações...</p>
      </div>
    )
  }

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {localReviews.length > 0 && (
          <div className="d-flex align-items-center">
            <div className="display-5 fw-bold me-2">{averageRating}</div>
            <div>
              <div className="text-warning">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(averageRating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <div className="small text-muted">
                {localReviews.length} avaliação
                {localReviews.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <Alert
          variant={error.includes('sucesso') ? 'success' : 'danger'}
          className="mb-4"
        >
          {error}
        </Alert>
      )}

      {/* Formulário de avaliação */}
      {showReviewForm && renderReviewForm()}

      {/* Botão para adicionar avaliação (quando há avaliações) */}
      {localReviews.length > 0 && renderAddReviewButton()}

      {/* Lista de avaliações ou estado vazio */}
      {localReviews.length > 0 ? renderReviewsList() : renderEmptyReviews()}
    </section>
  )
}

ProductReviews.propTypes = {
  reviews: PropTypes.array,
  productId: PropTypes.string.isRequired,
}

export default ProductReviews
