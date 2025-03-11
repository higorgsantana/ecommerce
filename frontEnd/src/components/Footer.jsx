import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="d-none d-md-flex align-items-center mb-3">
          {/*Icons + Links*/}
          <Col md={4} className="text-start">
            <div className="d-flex gap-3">
              <a
                href="https://github.com/higorgsantana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/higorguilherme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>

          <Col md={4} className="text-center">
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="text-light text-decoration-none">
                Home
              </Link>
              <Link to="/sobre" className="text-light text-decoration-none">
                Sobre
              </Link>
              <Link to="/contato" className="text-light text-decoration-none">
                Contato
              </Link>
            </div>
          </Col>

          {/* copy */}
          <Col md={4} className="text-end">
            <small className="text-light">
              © {currentYear} PC Store - Projeto para Portfólio
            </small>
          </Col>
        </Row>

        {/* mobile */}

        <Row className="d-flex d-md-none text-center">
          <Col xs={12} className="mb-3">
            <div className="d-flex justify-content-center gap-3">
              <a
                href="https://github.com/higorgsantana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/higorguilherme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>

          <Col xs={12} className="mb-3">
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="text-light text-decoration-none">
                Home
              </Link>
              <Link to="/sobre" className="text-light text-decoration-none">
                Sobre
              </Link>
              <Link to="/contato" className="text-light text-decoration-none">
                Contato
              </Link>
            </div>
          </Col>

          <Col xs={12}>
            <small className="text-light">
              © {currentYear} PC Store - Projeto para Portfólio
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
