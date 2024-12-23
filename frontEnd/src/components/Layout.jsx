import React from 'react'
import PropTypes from 'prop-types'
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

Layout.PropTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
