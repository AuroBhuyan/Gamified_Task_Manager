const express = require("express");
const router = express.Router();
const {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
} = require("../controllers/rewardController");

router.get("/", getRewards);
router.post("/", createReward);
router.patch("/:id", updateReward);
router.delete("/:id", deleteReward);

module.exports = router;
