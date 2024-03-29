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

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a task by id
router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const task = await Task.findById(id);
    console.log(task);
    if (task === null) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Delete all tasks
router.delete("/tasks", async (req, res) => {
  try {
    await Task.deleteMany();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task by id
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task by id
// Update a task by id
router.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { title } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title }, { new: true });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
