const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    _id: false,
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, enum: ['hardware', 'periféricos', 'outros'] },
    specs: {
      processador: String,
      memoria: String,
      armazenamento: String,
      placaDeVideo: String,
    },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)
