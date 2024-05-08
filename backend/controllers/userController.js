const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//JWT-Header,Payload,Sign
//type of token and algorithm if not specified HS256
//id is payload


//After a user successfully logs in or signs up, the server generates a token (e.g., JWT) representing the user's authentication status and includes it in the response sent back to the client (frontend). The token serves as proof of authentication for subsequent requests made by the user.
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

module.exports = { signupUser, loginUser }



//so here when they signip or login a special jwt token is created and sent to frontend , so with every response they can send it back , to verify the sign .