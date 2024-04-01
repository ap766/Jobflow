const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//id is payload
//For example, if you're using the jsonwebtoken library in Node.js, the default algorithm used for signing tokens is HS256 for symmetric signing when a secret key is provided, and RS256 for asymmetric signing when a private key is provided.


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


// login a user
const loginUser = async (req, res) => {
  console.log(req.body)
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)
// create a token
    const token = createToken(user._id)
    res.status(200).json({email, token})// See token being sent in response to frontend
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)
    //create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//In JavaScript, the module object is a special object available in Node.js environments that represents the current module.
module.exports = { signupUser, loginUser }