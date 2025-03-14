import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    await sendEmailVerification(userCredential.user)
    return userCredential
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Erro ao fazer logout: ', error)
    }
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const socialLogin = (provider) => {
    return signInWithPopup(auth, provider)
  }

  const signInWithGoogle = () => {
    return socialLogin(new GoogleAuthProvider())
  }

  const signInWithGithub = () => {
    return socialLogin(new GithubAuthProvider())
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        login,
        logOut,
        resetPassword,
        signInWithGoogle,
        signInWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
