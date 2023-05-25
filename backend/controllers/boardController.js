const Bd = require('../models/BoardModel')
const mongoose = require('mongoose')

// get all workouts
const getBoards = async (req, res) => {
  const boardss = await Bd.find({}).sort({createdAt: -1})

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
  const {title, interestedjobs, applied} = req.body

  // add to the database
  try {
    const workout = await Bd.create({ title, interestedjobs, applied})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a workout
const deleteBoard = async (req, res) => {
  const { id } = req.params

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