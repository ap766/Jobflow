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

// GET a single board
router.get('/:id', getBoard)

// POST a new board
router.post('/', createBoard)

// DELETE a board
router.delete('/:id', deleteBoard)

// UPDATE a board
router.patch('/:id', updateBoard)

module.exports = router