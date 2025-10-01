const Reward = require("../models/Reward");

function getUserId(req) {
  return req.headers["x-user-id"] || req.body.userId || req.query.userId;
}

const getRewards = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });

  const rewards = await Reward.find({ userId }).sort({ cost: 1 });
  res.json({
    message: "Rewards:",
    rewards,
  });
};

const createReward = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });

  const { name, cost } = req.body;
  if (!name || cost === undefined)
    return res.status(400).json({
      error: "Name & Cost Requires",
    });

  const reward = await Reward.create({
    userId,
    name: name.trim(),
    cost,
  });
  res.status(201).json({
    message: "Reward Added Successfully",
    reward,
  });
};

const updateReward = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });

  const { name, cost } = req.body;
  const reward = await Reward.findById({ _id: req.params.id, userId });
  if (!reward)
    return res.status(400).json({
      error: "Reward Not Found",
    });

  if (name) reward.name = name.trim();
  if (cost !== undefined) reward.cost = cost;

  await reward.save();
  res.json({
    message: "Reward Updated Successfully",
    reward,
  });
};

const deleteReward = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: "userId required" });
  
  const reward = await Reward.findOne({ _id: req.params.id, userId });
  if (!reward)
    return res.status(400).json({
      error: "Reward Not Found",
    });

  await reward.deleteOne();
  res.json({
    message: "Reward deleted Successfullty",
  });
};

module.exports = {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
};
