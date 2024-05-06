const express = require('express')
const { 
  
  getJobs,
  createJob,
  deleteJob,
  updateJob,
  updateJobnoti
} = require('../controllers/JobController')

 
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// require auth for all routes
router.use(requireAuth)

//router.get('/', getJobs)

// GET a single card/job
router.get('/:id', getJobs)

// POST a new card/job
router.post('/', createJob)

// DELETE a card/job
router.delete('/:id', deleteJob)

// UPDATE a card/job
router.patch('/:id', updateJob)

//UPDATE all of a user
router.patch('/', updateJobnoti)

module.exports = router