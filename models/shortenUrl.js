const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenUrlSchema = new Schema({
  originalUrl:{
    type: String,
    required: true
  },
  shortenUrl:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('ShortenUrl',shortenUrlSchema)