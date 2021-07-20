const express = require('express')
const connect = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//    DB connection
connect()

//    Settings
const PORT = process.env.PORT || 4000
app.use(cors())

//    Middlewares
app.use(morgan('dev'))
app.use(express.json({extended: true}))

//    Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//    Start Server 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`listen on PORT ${PORT}`)
})
