const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    const message = await MessageController.sendMessage(
      senderId,
      receiverId,
      content
    );

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:otherUserId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.otherUserId;

    const messages = await MessageController.getMessages(userId, otherUserId);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
