export async function encryptPrivateKey(
  privateKey: string,
  pwd: string,
  iterations = 10000,
) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(pwd),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"],
  );
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedWallet = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(privateKey),
  );
  // Convert ArrayBuffers to base64 strings
  return {
    encrypted: arrayBufferToBase64(encryptedWallet),
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    iterations,
  };
}

export async function decryptPrivateKey(
  encryptedData: {
    encrypted: string; // now a base64 string
    salt: string; // now a base64 string
    iv: string; // now a base64 string
    iterations: number;
  },
  pwd: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(pwd),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new Uint8Array(base64ToArrayBuffer(encryptedData.salt)),
      iterations: encryptedData.iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(base64ToArrayBuffer(encryptedData.iv)),
    },
    key,
    base64ToArrayBuffer(encryptedData.encrypted),
  );
  return decoder.decode(decryptedData);
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
