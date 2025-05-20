import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
  ],
  total: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Order', orderSchema)
