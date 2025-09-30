const Task = require("../models/Task");

const sameDay = (a, b) => {
  if (!a || !b) return false;
  const d1 = new Date(a);
  const d2 = new Date(b);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json({
    message: "Tasks:",
    tasks,
  });
};

const createTask = async (req, res) => {
  const { title, category, coinsReward } = req.body;
  if (!title || !title.trim())
    return res.status(400).json({
      error: "Title Required",
    });

  const task = await Task.create({
    title: title.trim(),
    category,
    coinsReward: coinsReward || 5,
  });

  res.status(201).json({
    message: "Task Created Successfully",
    task,
  });
};

const completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({
      error: "Task Not Found",
    });

  const now = new Date();
  const last = task.completedDates[task.completedDates.lengt - 1];

  if (sameDay(last, now))
    return res.status(404).json({
      error: "Already Completed",
    });
  task.completedDates.push(now);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (sameDay(last, yesterday)) task.streak.current += 1;
  else task.streak.current = 1;

  task.streak.best = Math.max(task.streak.best, task.streak.current);

  await task.save();
  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({
      error: "Task Not Found",
    });
  await task.deleteOne();
  res.json({
    message: "Task Deleted Successfully",
  });
};

const updateTask = async (req, res) => {
  const { title, category, coinsReward } = req.body;

  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({
      error: "Task Not Found",
    });

  if (title) task.title = title.trim();
  if (category) task.category = category;
  if (coinsReward !== undefined) task.coinsReward = coinsReward;

  await task.save();
  res.json({
    message: "Task Updated Successfully",
    task,
  });
};

module.exports = {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
  updateTask,
};
