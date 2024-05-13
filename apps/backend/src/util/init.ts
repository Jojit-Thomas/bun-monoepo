import mongoose from 'mongoose'
import axios from 'axios'
import { MONGODB_CONNECTION_STRING } from '@/env'

// As we are using bun they don't have support of brotli compression so we need to remove it
axios.defaults.headers.common["Accept-Encoding"] = "gzip, deflate"

//=========================== MONGODB CONNECTION ===========================
mongoose.Promise = global.Promise
if (MONGODB_CONNECTION_STRING) mongoose.connect(MONGODB_CONNECTION_STRING)
else {
  console.error('Mongodb connection string env variable is required')
  process.exit()
}
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
  process.exit()
})

// //=========================== INITIALIZING SERVICES ===========================
// import('./services/auth')
// import('./services/billing')
