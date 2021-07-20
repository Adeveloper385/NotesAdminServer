const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  }, 
  status: {
    type: Boolean,
    default: false
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  record: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Task", TaskSchema)
