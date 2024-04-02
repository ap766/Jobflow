const Jb = require('../models/JobModel')
const mongoose = require('mongoose')


const getJobs = async (req, res) => {
 


try {
  const { board_id } = req.params.id;
  const user_id = req.user._id;
  console.log("The BOARD ID IS")
  console.log(board_id)
  console.log(req.params.id)
  const jobs = await Jb.find({board_id:req.params.id,user_id:user_id}).sort({createdAt: -1})
  res.status(200).json(jobs);

  console.log(jobs)

  // Your code to fetch jobs
} catch (error) {
  console.error('Error fetching jobs:', error);
  res.status(500).json({ message: 'Server error' });
}
}



// const getJob= async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such job'})
//   }

//   const job = await Jb.findById(id)

//   if (!job) {
//     return res.status(404).json({error: 'No such job'})
//   }

//   res.status(200).json(job)
// }

// create a new workout
const createJob= async (req, res) => {
  console.log(req)
  const { title, section,id,board_id} = req.body;
  console.log(title)
  console.log(section)
  console.log(req.user._id)
 // add to the database
  try {
    const user_id = req.user._id//Added this at this
    //show req.user to see what it is and what it has
    console.log(req.body)
    // const jb = await Jb.create({ title,description,joblink,roundtiming,status,boardid,user_id,phone_number,id})//here too at last the user_id .. in the table too
    const jb = await Jb.create({ title,section,user_id,id,board_id})//here too at last the user_id .. in the table too
    console.log("hello")
    res.status(200).json(jb)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    console.log("heijjji")
    console.log(id)

    // Find and delete the job
    const job = await Jb.findOneAndDelete({ id: id, user_id: user_id });

    // If job is successfully deleted, send a success response
    res.status(200).json(job);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateJob = async (req, res) => {

  //THIS I HAVE SOME DOUBT 
  const { id } = req.params
  const user_id = req.user._id;

  console.log(id)
  console.log(req.body)

//ig const {title, load, reps} = req.body.. and then those three would also work this is shortcut
  const jb = await Jb.findOneAndUpdate({id: id,user_id:user_id}, {
    ...req.body
  })

  if (!jb) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).json(jb)
}


module.exports = { 
  getJobs,
  createJob,
  deleteJob,
  updateJob
}