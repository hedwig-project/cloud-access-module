import mongoose from 'mongoose'

let PresenceSchema = new mongoose.Schema({
  controllerId: { type: String, required: true },
  time: { type: Date, default: Date.now },
  presence: { type: Number, required: true },
})

export default mongoose.model('Presence', PresenceSchema)
