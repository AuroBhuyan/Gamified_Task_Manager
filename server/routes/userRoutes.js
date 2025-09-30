const express = require("express");
const router = express.Router();
const { getMe, spend } = require("../controllers/userController");

router.get("/me", getMe);
router.post("/spend", spend);

module.exports = router;
