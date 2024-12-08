const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthController.register(username, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthController.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await AuthController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
