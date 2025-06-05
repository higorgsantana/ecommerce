# 🛒 E-commerce React

Projeto fullstack de e-commerce desenvolvido para portfólio, com foco nas tecnologias modernas do ecossistema JavaScript.

## Funcionalidades Principais
- Autenticação de usuários com Firebase
- Catálogo de produtos com filtros
- Carrinho de compras persistente
- Página de produto com galeria de imagens
- Sistema de avaliações de produtos
- Checkout simulado

## Tecnologias Utilizadas
- **Frontend:** React, React Router, React Bootstrap
- **Backend:** Node.js, Express
- **Banco de Dados:** MongoDB
- **Autenticação:** Firebase Auth
- **Estilização:** CSS, Bootstrap

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ecommerce.git
```

2. Instale as dependências (frontend e backend):
```bash
cd ecommerce/frontend
npm install

cd ../backend
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Backend (crie arquivo .env na pasta backend)
STRIPE_SECRET_KEY=sua_chave_secreta_stripe
MONGODB_URI=sua_string_de_conexao_mongodb
PORT=5000
JWT_SECRET=um_segredo_forte
NODE_ENV=development

# Frontend (crie arquivo .env na pasta frontend)
VITE_STRIPE_PUBLIC_KEY=sua_chave_publica_stripe
```

4. Inicie os servidores:
```bash
# Em um terminal: backend
cd backend
npm start

# Em outro terminal: frontend
cd frontend
npm start
```
