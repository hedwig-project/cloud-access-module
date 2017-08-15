import mongoose from 'mongoose'

let GateSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  open: { type: Boolean, required: true },
})

export default mongoose.model('Gate', GateSchema)
