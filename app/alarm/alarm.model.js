import mongoose from 'mongoose'

let AlarmSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  active: { type: Boolean, required: true },
  timeSinceLastChange: { type: Date, default: Date.now },
})

export default mongoose.model('Alarm', AlarmSchema)
