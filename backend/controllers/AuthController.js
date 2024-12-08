const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const EncryptionUtil = require("../utils/encryption");

class AuthController {
  static async register(username, password) {
    const usersPath = path.join(__dirname, "../../database/users.json");

    try {
      const users = JSON.parse(await fs.readFile(usersPath, "utf8"));

      // Check if username exists
      if (users.find((u) => u.username === username)) {
        throw new Error("Username already exists");
      }

      const newUser = {
        id: uuidv4(),
        username,
        password: EncryptionUtil.hashPassword(password),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

      return {
        message: "User registered successfully",
        user: { id: newUser.id, username: newUser.username },
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    const usersPath = path.join(__dirname, "../../database/users.json");

    try {
      const users = JSON.parse(await fs.readFile(usersPath, "utf8"));
      const user = users.find((u) => u.username === username);

      if (!user || !EncryptionUtil.comparePassword(password, user.password)) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      return {
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username },
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    const usersPath = path.join(__dirname, "../../database/users.json");

    try {
      const users = JSON.parse(await fs.readFile(usersPath, "utf8"));
      return users.map((user) => ({
        id: user.id,
        username: user.username,
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthController;
