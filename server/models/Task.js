const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Physical", "Intellectual", "Spiritual", "Others"],
    default: "Others",
  },
  completedDates: {
    type: [Date],
    default: [],
  },
  streak: {
    current: {
      type: Number,
      default: 0,
    },
    best: {
      type: Number,
      default: 0,
    },
  },
  coinsReward: {
    type: Number,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TaskSchema.set("toJSON", {
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

module.exports = mongoose.model("Task", TaskSchema);
