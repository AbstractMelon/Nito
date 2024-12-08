async function importKeyFromHex(hexKey) {
  console.log(hexKey);
  const keyBuffer = new Uint8Array(hexKey.length / 2);
  for (let i = 0; i < keyBuffer.length; i++) {
    keyBuffer[i] = parseInt(hexKey.substr(i * 2, 2), 16);
  }

  return await crypto.subtle.importKey(
    "raw", // raw format
    keyBuffer, // The key buffer
    { name: "AES-GCM" }, // Algorithm
    true, // Extractable
    ["encrypt", "decrypt"] // Usages
  );
}

export { importKeyFromHex };
