import mongoose from 'mongoose'

let TemperatureSchema = new mongoose.Schema({
  controllerId: { type: String, required: true },
  time: { type: Date, default: Date.now },
  temperature: { type: Number, required: true },
})

export default mongoose.model('Temperature', TemperatureSchema)
