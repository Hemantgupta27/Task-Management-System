require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const limiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorMiddleware");

const { swaggerUi, swaggerSpec } = require("./config/swagger");

const app = express();

app.use(express.json());
app.use(cors());
app.use(limiter);

app.get("/",(req, res) => {
    res.send("TASK MAnager API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});
