const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

// let token, author
var mongod
const connectDB = async () => {
  try {
    const config = {
      // connectTimeoutMS: 5000,
      // socketTimeoutMS: 5000,
      // useUnifiedTopology: true,
    }
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await mongoose.connect(uri, config)
    console.log('test connection Sucessful')
    return uri
  } catch (err) {
    console.log(err)
    console.log('hello')
  }
}
const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    if (mongod) {
      mongod.stop()
      console.log('Database disconnected and stopped mongodb memory server')
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = { connectDB, disconnectDB }
