import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  total: { type: Number, required: true, min: 0 },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  status: {
    type: String,
    required: true,
    enum: ['pendente', 'processando', 'envido', 'entregue', 'cancelado'],
    default: 'pendente',
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Order', orderSchema)
