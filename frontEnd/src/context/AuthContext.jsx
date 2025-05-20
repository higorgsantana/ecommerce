import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import axios from 'axios'
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

  const signUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      await updateProfile(userCredential.user, { displayName })

      await axios.post('http://localhost:5000/api/users', {
        firebaseId: userCredential.user.uid,
        email: email,
        displayName: displayName,
      })

      await sendEmailVerification(userCredential.user)
      return userCredential
    } catch (error) {
      console.error('Erro no registro: ', error)
      throw error
    }
  }

  const updateUserProfile = async (updates) => {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new Error('Nenhum usuário autenticado')
      }

      await updateProfile(currentUser, updates)

      setUser((prev) => ({
        ...prev,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }))
    } catch (error) {
      console.error('Erro ao atualizar o perfil: ', error)
      throw error
    }
  }

  const updatePhoneNumber = async (phoneNumber) => {
    try {
      const currentUser = auth.currentUser
      await updatePhoneNumber(currentUser, phoneNumber)
      setUser((prev) => ({ ...prev, phoneNumber }))
    } catch (error) {
      console.error('Erro ao atualizar o telefone: ', error)
      throw error
    }
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    try {
      await auth.signOut()
      setUser(null)
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
        user: user,
        loading: loading,
        signUp,
        login,
        logOut,
        resetPassword,
        signInWithGoogle,
        signInWithGithub,
        updateUserProfile,
        updatePhoneNumber,
      }}
    >
      {!loading && children}
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
