const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Routes
const taskRoutes = require("./routes/taskRoutes");

app.get("/", (req, res) => res.send("Backend Running!"));
app.use("/api/tasks", taskRoutes);

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
