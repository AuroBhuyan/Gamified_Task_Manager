const User = require("../models/User");
const Reward = require("../models/Reward");

const getUserId = (req) => {
  return req.headers["x-user-id"] || req.body.userId || req.query.userId;
};

const getMe = async (req, res) => {
  const userId = getUserId(req);
  if (!userId)
    return res.status(400).json({
      error: "userId Required",
    });

  let user = await User.findOne({ userId });
  if (!user) user = await User.create({ userId, coins: 0 });

  res.json(user);
};

const spend = async (req, res) => {
  const userId = getUserId(req);
  if (!userId)
    return res.status(400).json({
      error: "userId Required",
    });

  const { rewardId } = req.body;
  if (!rewardId)
    return res.status(400).json({
      error: "rewardId is Required",
    });

  const reward = await Reward.findOne({ _id: rewardId, userId });
  if (!reward)
    return res.status(400).json({
      error: "Reward Not Found For This User",
    });

  let user = await User.findOne({ userId });
  if (!user)
    user = await User.create({
      userId,
      coins: 0,
    });

  if (user.coins < reward.cost)
    return res.status(400).json({
      error: "Not Enough Coins",
    });

  user.coins -= reward.cost;
  await user.save();

  res.json({
    ok: true,
    coins: user.coins,
    reward,
  });
};

module.exports = {
  getMe,
  spend,
};
