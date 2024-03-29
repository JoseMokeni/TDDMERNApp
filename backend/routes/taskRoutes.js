const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// Add a task
router.post("/tasks", async (req, res) => {
  const { title } = new Task(req.body);
  try {
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
