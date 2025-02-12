import React from 'react'
import Header from './Header'
import Footer from './Footer'
import PropTypes from 'prop-types'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem', minHeight: '70vh' }}>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
