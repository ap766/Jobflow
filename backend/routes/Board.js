const express = require('express')
const {
  
getBoards,
getBoard,
createBoard,
updateBoard,
deleteBoard
} = require('../controllers/BoardController')

 
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