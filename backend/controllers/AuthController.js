const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const EncryptionUtil = require("../utils/encryption");

class AuthController {
  static async register(username, password) {
    const userDir = path.join(__dirname, "../../database/users");

    try {
      // Generate UUIDv4 for the user id
      const id = uuidv4();

      const userPath = path.join(userDir, `user-${username}-${id}.json`);

      // Check if username exists
      if (await fs.stat(userPath).catch(() => false)) {
        throw new Error("Username already exists");
      }

      const newUser = {
        id: id,
        username,
        password: EncryptionUtil.hashPassword(password),
        createdAt: new Date().toISOString(),
      };

      // Write user data to a separate file
      await fs.writeFile(userPath, JSON.stringify(newUser, null, 2), "utf8");

      // Generate JWT token after user registration
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      return {
        message: "User registered successfully",
        token, // Return the token along with the user info
        user: { id: newUser.id, username: newUser.username },
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    const userDir = path.join(__dirname, "../../database/users");

    try {
      // Read the user directory
      const files = await fs.readdir(userDir);

      // Find the file that corresponds to the username
      const userFile = files.find((file) => file.includes(`user-${username}-`));

      // If no matching file found, throw an error
      if (!userFile) {
        throw new Error("Invalid username or password");
      }

      // Read the user data from the file
      const user = JSON.parse(
        await fs.readFile(path.join(userDir, userFile), "utf8")
      );

      // Validate the password
      if (!user || !EncryptionUtil.comparePassword(password, user.password)) {
        throw new Error("Invalid credentials");
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      // Return login success response with the token and user info
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
    const userDir = path.join(__dirname, "../../database/users");

    try {
      const files = await fs.readdir(userDir);
      const users = await Promise.all(
        files.map(async (file) => {
          const user = JSON.parse(
            await fs.readFile(path.join(userDir, file), "utf8")
          );
          return { id: user.id, username: user.username };
        })
      );

      return users;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthController;
