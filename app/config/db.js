import dotenv from 'dotenv'

dotenv.config()

export default {
  development: {
    uri: 'mongodb://localhost/cloud-access-module',
  },
  test: {
    uri: 'mongodb://localhost/cloud-access-module-test',
  },
  production: {
    uri: process.env.DB_URI,
  },
}
