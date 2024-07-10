// utils.js

import CryptoJS from 'crypto-js';

// Encryption and decryption functions
export function encryptData(data) {
  return CryptoJS.AES.encrypt(data, 'abc123').toString();
}

export function decryptData(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, 'abc123');
  return bytes.toString(CryptoJS.enc.Utf8);
}
