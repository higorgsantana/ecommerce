import { auth, provider } from '../firebase-config'
import { signInWithPopup, signOut } from 'firebase/auth'

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error('Erro no login: ', error)
    throw error
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Erro ao sair: ', error)
    throw error
  }
}
