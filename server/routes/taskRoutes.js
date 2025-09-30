const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.post("/:id/complete", completeTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

module.exports = router;
