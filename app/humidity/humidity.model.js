import mongoose from 'mongoose'

let HumiditySchema = new mongoose.Schema({
  controllerId: { type: String, required: true },
  time: { type: Date, default: Date.now },
  humidity: { type: Number, required: true },
})

export default mongoose.model('Humidity', HumiditySchema)
