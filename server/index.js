const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => res.send("Backend Running!"));
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rewards", rewardRoutes);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server Running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed To Start Server: ", err.message);
    process.exit(1);
  }
};

startServer();
