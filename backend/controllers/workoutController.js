const WorkoutModel = require('../models/Workout')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    //const workouts = await WorkoutModel.find({}).sort({createdAT:-1})

    //res.status(200).json(workouts)



    const url = 'https://api-nba-v1.p.rapidapi.com/players?team=1&season=2021';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'eb86ba07b6msh8a53b791c367ad1p1dad33jsn5f498ec9e1df',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        res.status(200);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// get a single workout
const getWorkout = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await WorkoutModel.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}


//create new workout
const createWorkout = async(req,res) => {
    const {title, load, reps} = req.body //extract from request

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    } 
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    try {
        const workout = await WorkoutModel.create({title, load, reps});
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a vlid workout id'})
    }

    const workout = await WorkoutModel.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: 'No such workout to delete'})
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a vlid workout id'})
    }

    const workout = await WorkoutModel.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if (!workout) {
        return res.status(400).json({error: 'No such workout to delete'})
    }

    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout
}