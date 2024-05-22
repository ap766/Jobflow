require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // Import the CORS package
const scheduleNotifications = require('./NotificationController.js'); // Import the function to schedule notifications

// import routes
const JobBoard = require('./routes/JobAppSteps')
const userRoutes = require('./routes/user.js')
const BoardRoutes = require('./routes/Board.js')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({ origin: 'https://jobflow-1.onrender.com/' })) // Use CORS middleware with specific origin

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/JobAppSteps', JobBoard )
app.use('/api/user', userRoutes)
app.use('/api/Board', BoardRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    
    // Call the function to schedule notifications
    scheduleNotifications();
    
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

module.exports = app
