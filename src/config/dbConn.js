const mongoose = require('mongoose')
const Logger = require('../logger/logger')
const { MongoMemoryServer } = require('mongodb-memory-server')

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  useUnifiedTopology: true,
}
const connectDB = async () => {
  try {
    // const mongod = await MongoMemoryServer.create();
    // const uri = mongod.getUri();
    // await mongoose.connect(uri,config)
    await mongoose.connect(process.env.DATABASE_URI, config)
    console.log('connection Sucessful')
    Logger.info('connection to DataBase successful')
  } catch (err) {
    Logger.error(err)
    setTimeout(() => {
      connectDB()
    }, 3000)
  }
  // setTimeout(()=>{
  //     connectDB()
  // },3000)
}

module.exports = connectDB
