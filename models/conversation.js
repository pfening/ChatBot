var mongoose = require('mongoose');

var convSchema = mongoose.Schema({
  sentence: String,
  tags: [String],
  answer: String
});

var Conv = module.exports = mongoose.model('Conv', convSchema);
