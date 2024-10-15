const mongoose = require('mongoose')

const Schema = mongoose.Schema

//defines the structure of a workout
const workoutSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Workout', workoutSchema) //creates the model for the schema and exports it


