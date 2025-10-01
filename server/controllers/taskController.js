const Task = require("../models/Task");
const User = require("../models/User");

const getUserId = (req) => {
  return req.headers["x-user-id"] || req.body.userId || req.query.userId;
};

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
  const userId = getUserId(req);
  if (!userId)
    return res.status(400).json({
      error: "userId Required",
    });
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  res.json({
    message: "Tasks:",
    tasks,
  });
};

const createTask = async (req, res) => {
  const userId = getUserId(req);
  if (!userId)
    return res.status(400).json({
      error: "userId Required",
    });
  const { title, category, coinsReward } = req.body;
  if (!title || !title.trim())
    return res.status(400).json({
      error: "Title Required",
    });

  const task = await Task.create({
    userId,
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
  const userId = getUserId(req);
  if (!userId)
    return res.status(400).json({
      error: "userId Required",
    });

  const task = await Task.findById({ _id: req.params.id, userId });
  if (!task)
    return res.status(404).json({
      error: "Task Not Found",
    });

  const now = new Date();
  const last = task.completedDates[task.completedDates.length - 1];

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

  let user = await User.findOne({ userId });
  if (!user) {
    user = await User.create({
      userId,
      coins: 0,
      accumulatedDamage:0,
    });
  }
  user.coins += task.coinsReward || 0;
  user.accumulatedDamage =
    (user.accumulatedDamage || 0) + (task.coinsReward || 0) * 5;

  await user.save();

  res.json({
    message: "Task Completed",
    task,
    coins: user.coins,
    pendingAttack: user.accumulatedDamage,
  });
};

const deleteTask = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });

  const task = await Task.findOne({ _id: req.params.id, userId });
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
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });

  const task = await Task.findById({ _id: req.params.id, userId });
  if (!task)
    return res.status(404).json({
      error: "Task Not Found",
    });

  const { title, category, coinsReward } = req.body;
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
