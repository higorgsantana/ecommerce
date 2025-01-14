import React from 'react'
import Header from './Header'
import Footer from './Footer'

/* eslint-disable react/prop-types */
function Layout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem', minHeight: '70vh' }}>{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
