
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//schema is boardSchema
const boardsSchema = new Schema({

  title: {
    type: String,
    required:true
  },
   user_id: {
    type: String,
    required: true
  }
  

}, { timestamps: true })

//Board is gonna become Boards Collection
module.exports = mongoose.model('Boards', boardsSchema)