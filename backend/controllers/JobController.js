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
  console.log(req)
  const { title, section,id } = req.body;

  console.log(title)
  console.log(section)
  console.log(req.user._id)
 // add to the database
  try {
    const user_id = req.user._id//Added this at this
    //show req.user to see what it is and what it has
    console.log(req.user)
    // const jb = await Jb.create({ title,description,joblink,roundtiming,status,boardid,user_id,phone_number,id})//here too at last the user_id .. in the table too
    const jb = await Jb.create({ title,section,user_id,id})//here too at last the user_id .. in the table too
    console.log("hello")
    res.status(200).json(jb)
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
  const { ID } = req.params

  console.log(ID)
  console.log(req.body)
  
 const query = { id: { $exists: true, $eq: ID} };
 const result = await Jb.find(query);
 console.log(result)


//ig const {title, load, reps} = req.body.. and then those three would also work this is shortcut
  const jb = await Jb.findOneAndUpdate({id: ID}, {
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