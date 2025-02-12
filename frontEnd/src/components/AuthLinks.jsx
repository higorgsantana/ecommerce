import React from 'react'
import { useAuth } from '../context/AuthContext'
import { loginWithGoogle, logout } from '../services/auth'

const AuthLinks = () => {
  const { user } = useAuth()

  return (
    <div className="ms-3">
      {user ? (
        <button onClick={logout} className="btn btn-outline-danger">
          Sair
        </button>
      ) : (
        <button onClick={loginWithGoogle} className="btn btn-outline-primary">
          Entrar com Google
        </button>
      )}
    </div>
  )
}

export default AuthLinks
