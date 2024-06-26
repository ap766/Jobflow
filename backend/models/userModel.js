const mongoose = require('mongoose')
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.To create a model
//Wrapper around MongoDB
// It provides a higher-level, schema-based abstraction over the MongoDB Node.js driver
//Overall, Mongoose simplifies MongoDB interactions and data modeling for Node.js applications, providing a rich set of features for schema definition, data validation, query building, and middleware execution
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
})


// static signup method
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  
//original form is a security risk
//so hash the password before saving it to the database
//because if db breached the passwords are not exposed
//although hackers may figure it through brute force but it will take a long time
//and gives users time to change their passwords
//hashed passwords compared when they log in


//bcrypt is a hashing function 
//salt - random string added to the password before hashing to make it unique (same passwords)
//extra layer of protection 

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hash })

  return user
}

//statics is an object where you can add methods that are attached directly to your model

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }
  //The bcrypt.compare function is used to compare a plain-text password with a hashed password to determine if they match.
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)