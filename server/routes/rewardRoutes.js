const express = require("express");
const router = express.Router();
const {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
  redeemReward,
} = require("../controllers/rewardController");

router.get("/", getRewards);
router.post("/", createReward);
router.patch("/:id", updateReward);
router.delete("/:id", deleteReward);
router.post("/:id/redeem", redeemReward);

module.exports = router;
