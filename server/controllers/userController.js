const User = require("../models/User");

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

  const { cost, rewardId } = req.body;
  if (typeof cost !== "number")
    return res.status(400).json({
      error: "Cost(Number) is Requires",
    });

  let user = await User.findOne({ userId });
  if (!user)
    user = await User.create({
      userId,
      coins: 0,
    });

  if (user.coins < cost)
    return res.status(400).json({
      error: "Not Enough Coins",
    });

  user.coins -= cost;
  await user.save();

  res.json({
    ok: true,
    coins: user.coins,
    rewardId,
  });
};

module.exports = {
  getMe,
  spend,
};
