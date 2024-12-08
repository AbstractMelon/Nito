class EncryptionService {
  static async generateKey() {
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    return key;
  }

  static async encrypt(data, key) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      dataBuffer
    );

    return {
      data: Array.from(new Uint8Array(encryptedData)),
      iv: Array.from(iv),
    };
  }

  static async decrypt(encryptedData, iv, key) {
    const decoder = new TextDecoder();
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      new Uint8Array(encryptedData)
    );

    return decoder.decode(decrypted);
  }
}

export default EncryptionService;
