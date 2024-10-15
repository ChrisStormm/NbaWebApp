const express = require('express')
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const gamesRoutes = require('./routes/gamesRoutes')
const mongoose = require('mongoose')
const cors = require('cors');

//express app
const app = express();



//middleware
app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json()) //looks for data sent to server and attaches it to req object


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes) //gets all of the routers attached to that router
app.use('/api/games', gamesRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //start listening for requests once connected to database
        app.listen(process.env.PORT, () => { // port pulled from .env file
            console.log(' connected to db listening on port 4000')
        })
    })
    .catch((err) => {
        console.log(err)
    })
