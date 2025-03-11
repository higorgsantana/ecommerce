import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'
import { Spinner } from 'react-bootstrap'

const RequireAuth = ({ children, verifyEmail = false }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Spinner animation="border" />

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (verifyEmail && !user.emailVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  verifyEmail: PropTypes.bool,
}

export default RequireAuth
