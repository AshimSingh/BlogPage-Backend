const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: './config.env' })
const PORT = process.env.PORT
const connectDB = require('./src/config/dbConn')
const { sendResponse } = require('./src/helper/response')
const httpLogger = require('./src/logger/httplogger')
const errorHandler = require('./src/middleware/errorHandler')
const swaggerUi = require('swagger-ui-express')
const docs = require('./documentation/index')
//socket
const app = express()
const socketIo = require('socket.io')
const server = require('http').Server(app)

var cors = require('cors')
const { initilizeSocket } = require('./socket')
app.use(express.json())
// connectDB();
app.use(httpLogger)
app.use('/api', cors(), require('./src/routes/route'))
app.use('/', cors(), express.static(path.join(__dirname, '/public')))
app.use('/media', express.static(path.join(__dirname, '/public')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views', 'index.html'))
})
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(docs))
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next)
})
app.use('/healthy',(req,res)=>{res.status(200).json({message:'I am healthy bro.'})})

// Middleware
app.use(cors())

//socket
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_SERVER,
  },
})
app.set('io', io)

initilizeSocket(io)

module.exports = server
