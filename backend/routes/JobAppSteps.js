const express = require('express')
const {
  getBoards, 
  getBoard, 
  createBoard, 
  deleteBoard, 
  updateBoard
} = require('../controllers/boardController')
 
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// require auth for all routes
router.use(requireAuth)

router.get('/', getBoards)

// GET a single workout
router.get('/:id', getBoard)

// POST a new workout
router.post('/', createBoard)

// DELETE a workout
router.delete('/:id', deleteBoard)

// UPDATE a workout
router.patch('/:id', updateBoard)

module.exports = router