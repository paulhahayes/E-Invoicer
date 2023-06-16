import crypto from 'crypto';

function encrypt(text: string, password: string) {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;
}

function decrypt(encryptedText: string, password: string) {
  try {
    const parts = encryptedText.split(':');
    const salt = Buffer.from(parts.shift(), 'hex');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encrypted = parts.join(':');
    const key = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    throw new Error('Invalid decryption key');
  }
}

export { encrypt, decrypt };
