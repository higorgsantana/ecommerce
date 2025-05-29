import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import UserPage from './pages/UserPage'
import CategoryPage from './pages/CategoryPage'
import Home from './pages/Home'
import About from './pages/AboutPage'
import Header from './components/Header'
import Footer from './components/Footer'
import RequireAuth from './components/RequireAuth'
import SearchResultsPage from './pages/SearchResultPage'
import ContactPage from './pages/ContactPage'
import CheckOutPage from './pages/CheckOutPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route
                  path="/category/:categoryId"
                  element={<CategoryPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <UserPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <RequireAuth>
                      <CartPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <RequireAuth>
                      <CheckOutPage />
                    </RequireAuth>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
