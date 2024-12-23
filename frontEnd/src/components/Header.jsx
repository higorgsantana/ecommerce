import React from 'react'

function Header() {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f4f4f4' }}>
      <h1>Meu E-commerce</h1>
      <nav>
        <a href="/" style={{ margin: '0 1rem' }}>
          Home
        </a>
        <a href="/about" style={{ margin: '0 1rem' }}>
          Sobre
        </a>
      </nav>
    </header>
  )
}

export default Header
