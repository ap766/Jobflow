const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {

    //So the verificaton happens by extracting the id from the frontend jwt token.
    const { _id } = jwt.verify(token, process.env.SECRET)

    //will be used furthur 
    req.user = await User.findOne({ _id }).select('_id')
    
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth