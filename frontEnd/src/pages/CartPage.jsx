import React from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  return (
    <Container className="my-5">
      <h2 className="mb-4">Seu Carrinho</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max={item.stock}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                />
              </td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.price * item.quantity)}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end">
        <h4>
          Total:{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total)}
        </h4>
        <Button variant="sucess">Finalizar Compra</Button>
      </div>
    </Container>
  )
}

export default CartPage
