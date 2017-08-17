import mongoose from 'mongoose'

let AlarmSchema = new mongoose.Schema({
  controllerId: { type: String, required: true },
  time: { type: Date, default: Date.now },
  active: { type: Boolean, required: true },
  timeSinceLastChange: { type: Date, default: Date.now },
})

export default mongoose.model('Alarm', AlarmSchema)
