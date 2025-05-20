import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String },
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

export default mongoose.model('Product', productSchema)
