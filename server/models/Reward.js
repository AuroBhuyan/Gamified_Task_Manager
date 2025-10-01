const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

RewardSchema.set("toJSON", {
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

module.exports = mongoose.model("Reward", RewardSchema);
