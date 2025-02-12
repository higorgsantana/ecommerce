import React, { useEffect, useState } from 'react'
import {
  Container,
  Navbar,
  Form,
  Button,
  InputGroup,
  Spinner,
} from 'react-bootstrap'
import { BiSearch, BiCart, BiUser } from 'react-icons/bi'
import Logo from './Logo'
import useMobileDetection from '../hooks/useMobileDetection'
import { useAuth } from '../context/AuthContext'
import '../assets/styles/components/header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, loading } = useAuth()
  const { isMobile } = useMobileDetection(768)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Buscar:', searchTerm)
    setShowMobileSearch(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className={`py-2 fixed-top ${isScrolled ? 'header-scrolled' : ''}`}
        style={{ transition: 'all 0.3 ease' }}
      >
        <Container fluid="lg">
          {/* Logo alinhado à esquerda */}
          <Navbar.Brand className="d-flex align-items-center">
            <Logo />
          </Navbar.Brand>

          {/* Conteúdo centralizado */}
          <div className="d-flex flex-grow-1 justify-content-center">
            {!isMobile && (
              <Form
                className="d-flex"
                onSubmit={handleSearch}
                style={{ width: '50%', maxWidth: '600px' }}
              >
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-1 border-end-0"
                  />
                  <Button
                    variant="outline-light"
                    type="submit"
                    className="border-start-0"
                  >
                    <BiSearch className="fs-5" />
                  </Button>
                </InputGroup>
              </Form>
            )}
          </div>

          {/* Seção direita */}
          <div className="d-flex align-items-center ms-auto">
            {!isMobile && (
              <>
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : user ? (
                  <div className="d-flex align-items-center">
                    <Button variant="outline-light" className="me-2">
                      <BiUser className="fs-5" />
                    </Button>
                    <Button variant="outline-danger" className="ms-2">
                      Sair
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-light">Entrar</Button>
                    <Button variant="primary">Cadastrar</Button>
                  </div>
                )}

                <Button variant="outline-light" className="ms-3">
                  <BiCart className="fs-5" />
                  <span className="ms-1 badge bg-danger">3</span>
                </Button>
              </>
            )}

            {/* Mobile */}
            {isMobile && (
              <div className="d-flex align-items-center gap-3">
                <Button
                  variant="link"
                  className="text-white p-0"
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <BiSearch className="fs-5" />
                </Button>
                <Button variant="link" className="text-white p-0">
                  <BiCart className="fs-5" />
                  <span className="ms-1 badge bg-danger">3</span>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Mobile Search Overlay */}
      {isMobile && showMobileSearch && (
        <div className="bg-dark p-3 shadow-sm">
          <Form onSubmit={handleSearch} className="d-flex">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-1"
                autoFocus
              />
              <Button variant="primary" type="submit">
                <BiSearch className="fs-5" />
              </Button>
            </InputGroup>
          </Form>
        </div>
      )}
    </>
  )
}

export default Header
