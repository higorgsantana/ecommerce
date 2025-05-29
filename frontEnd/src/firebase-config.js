import { initializeApp } from 'firebase/app'
import {
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBbRDqusbDtVbiULppnvNIajJ58MDqgWGc',
  authDomain: 'ecommerce-bb9e2.firebaseapp.com',
  projectId: 'ecommerce-bb9e2',
  storageBucket: 'ecommerce-bb9e2.firebasestorage.app',
  messagingSenderId: '326774183508',
  appId: '1:326774183508:web:48ed5c11f862b657233fc1',
  disablePermissionsPolicyHeaders: true,
}

export { GoogleAuthProvider, GithubAuthProvider, updateProfile }
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
