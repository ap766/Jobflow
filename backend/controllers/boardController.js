const Bd = require('../models/BoardModel')

const mongoose = require('mongoose')

// get all workouts

const getBoards = async (req, res) => {
  
  const user_id = req.user._id
  const boardss = await Bd.find({user_id}).sort({createdAt: -1})
  res.status(200).json(boardss)
}


// get a single workout
const getBoard= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Bd.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}



// create a new workout
const createBoard = async (req, res) => {
  console.log(req.body)
  console.log("hey")
  
  const {title, interestedjobs, applied} = req.body
   let emptyFields = []
   if (!title) {
    emptyFields.push('title')
  }
  if (!interestedjobs) {
    emptyFields.push('load')
  }
  if (!applied) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }


 // add to the database
  try {
    const user_id = req.user._id//Added this at this
    //show req.user to see what it is and what it has
    console.log(req.user)
    const workout = await Bd.create({ title, interestedjobs, applied,user_id})//here too at last the user_id .. in the table too
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a workout
const deleteBoard = async (req, res) => {
  const { id } = req.params
  
  console.log("hola")
  console.log(req.user)
  console.log(req.body)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Bd.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateBoard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
//ig const {title, load, reps} = req.body.. and then those three would also work this is shortcut
  const workout = await Bd.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
}