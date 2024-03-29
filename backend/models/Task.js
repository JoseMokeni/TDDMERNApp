// Task model

const mongoose = require('mongoose');

// create a schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

// create a model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
