import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  phoneNumber: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)
