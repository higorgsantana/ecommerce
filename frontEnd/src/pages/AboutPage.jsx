import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaLaptopCode, FaShippingFast, FaUsers } from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiMongodb, SiFirebase } from 'react-icons/si'
import '../assets/styles/components/AboutPage.css'

const AboutPage = () => {
  return (
    <Container className="my-5 py-4 about-container">
      <Row className="text-center mb-5">
        <Col>
          <h2 className="display-4 mb-4">
            <FaLaptopCode className="me-3 text-primary" />
            Sobre a PC Store
          </h2>
          <p className="lead">
            Bem-vindo à PC Store, uma plataforma de e-commerce{' '}
            <strong>focada em computadores e periféricos</strong>, desenvolvida
            exclusivamente para demonstração de habilidades em desenvolvimento
            full-stack.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaShippingFast size={40} className="mb-3 text-success" />
              <Card.Title>Missão do Projeto</Card.Title>
              <Card.Text>
                Simular um e-commerce real com funcionalidades completas:
                catálogo dinâmico, carrinho, autenticação de usuários e
                pagamentos fictícios.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaUsers size={40} className="mb-3 text-info" />
              <Card.Title>Para Quem é Este Projeto?</Card.Title>
              <Card.Text>
                Recrutadores e profissionais de TI que desejam analisar minhas
                capacidades técnicas na construção de sistemas web complexos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={40}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaLaptopCode size={40} className="mb-3 text-danger" />
              <Card.Title>Tecnologias Utilizadas</Card.Title>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <SiReact size={30} title="React" />
                <SiNodedotjs size={30} title="Node.js" />
                <SiMongodb size={30} title="MongoDB" />
                <SiFirebase size={30} title="Firebase" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="bg-light p-4 rounded-3">
          <h4 className="mb-3">Detalhes Técnicos</h4>
          <ul className="list-unstyled">
            <li>✅ Sistema completo de autenticação com Firebase</li>
            <li>✅ API RESTful com Node.js e Express</li>
            <li>✅ Banco de dados NoSQL com MongoDB</li>
            <li>✅ UI responsiva com React e Bootstrap</li>
            <li>✅ Dados sensíveis protegidos por variáveis de ambiente</li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutPage
