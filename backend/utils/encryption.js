const crypto = require("crypto");
const bcrypt = require("bcrypt");

class EncryptionUtil {
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static encrypt(text) {
    const algorithm = "aes-256-cbc";
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {
      iv: iv.toString("hex"),
      key: key.toString("hex"),
      content: encrypted,
    };
  }

  static decrypt(encrypted, key, iv) {
    const algorithm = "aes-256-cbc";
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(key, "hex"),
      Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

module.exports = EncryptionUtil;
