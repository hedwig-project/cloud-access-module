import mongoose from 'mongoose'

let RelaySchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  name: { type: String, required: true },
  open: { type: Boolean, required: true },
})

export default mongoose.model('Relay', RelaySchema)
