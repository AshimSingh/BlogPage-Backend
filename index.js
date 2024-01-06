const app = require('./app')
// const logger = require('./src/logger/logger')
const PORT = process.env.PORT || 3000
const connectDB = require('./src/config/dbConn')

// app.use('/api',require('./src/routes/route'))
// app.use('/users',require('./src/routes/userRoures'))
// app.use('/blogs',require('./src/routes/blogRoutes'))
// app.use('/users/login',require('./src/routes/loginRoutes'))

// app.get('/api',(req,res)=>{
//     res.send("hello ashim")
// })
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/src/views','index.html'))
// })

connectDB()

app.listen(PORT, () => {
  console.log(`Port is running on port: ${PORT} `)
})
