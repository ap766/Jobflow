const Jb = require('../models/JobModel')
const mongoose = require('mongoose')


const getJobs = async (req, res) => {
  
  const user_id = req.user._id
  const jobs = await Jb.find({user_id}).sort({createdAt: -1})
  res.status(200).json(jobs)
}



const getJob= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such job'})
  }

  const job = await Jb.findById(id)

  if (!job) {
    return res.status(404).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// create a new workout
const createJob= async (req, res) => {
  console.log(req.body)
  console.log("hey")
   //CUS WE COULD DIRECTLY CREATE IN 3RD COLUMN
  title="Untitled"
  description="No Description"
  joblink="No Link"
  roundtiming="None"
  status="None"
  phone_number="None"
  const {title,description,joblink,roundtiming,status,phone_number} = req.body
  
 // add to the database
  try {
    const user_id = req.user._id//Added this at this
    //show req.user to see what it is and what it has
    console.log(req.user)
    const jb = await Jb.create({ title,description,joblink,roundtiming,status,boardid,user_id,phone_number})//here too at last the user_id .. in the table too
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a workout
const deleteJob= async (req, res) => {
  const { id } = req.params


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Job'})
  }

  const job = await Jb.findOneAndDelete({_id: id})

  if(!job) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// update a workout
const updateJob = async (req, res) => {

  //THIS I HAVE SOME DOUBT 
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
//ig const {title, load, reps} = req.body.. and then those three would also work this is shortcut
  const jb = await Jb.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!jb) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).json(jb)
}

module.exports = { 
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob
}