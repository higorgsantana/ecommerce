import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  description: String,
})

export default mongoose.model('Category', categorySchema)
