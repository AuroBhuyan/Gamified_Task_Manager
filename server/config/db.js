const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected: ${conn.connection.name}`);
  } catch (err) {
    console.error("Database Connection Error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
