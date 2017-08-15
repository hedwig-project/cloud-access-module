import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import db from './config/db'
import routes from './routes'
import logger from './logger'

// Use Bluebird for Promises
Promise = bluebird

// Express setup
const app = express()

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// Routes
app.use('/api', routes)

// MongoDB and Mongoose setup
mongoose.Promise = bluebird

mongoose.connect(db[process.env.NODE_ENV].uri, { useMongoClient: true })

if (process.env.NODE_ENV === 'production') {
  mongoose.set('debug', true)
}

// Server up
app.listen((process.env.PORT || 3000), () => {
  logger.info(`Server listening on port ${process.env.PORT || 3000}`)
})

export default app
