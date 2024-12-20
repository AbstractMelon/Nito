const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Make sure database directories exist
const dbPaths = [
  path.join(__dirname, "../database/users/"),
  path.join(__dirname, "../database/chats/"),
];

dbPaths.forEach((dbPath) => {
  // Make sure the directory exists
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Import error handling middleware
const errorHandlingMiddleware = require("./middleware/ErrorHandling");

// Use the error handling middleware
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
