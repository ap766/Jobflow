const mongoose = require('mongoose')

const Schema = mongoose.Schema

//schema is boardSchema
const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  interestedjobs: {
    type: String
  },
  applied: {
    type: String
  },
   user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

//Board is gonna become Boards Collection
module.exports = mongoose.model('Board', boardSchema)