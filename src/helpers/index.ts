// Importing the 'crypto' module for cryptographic functionality
import crypto from 'crypto';

// Secret key used for cryptographic operations
const SECRET = 'FLORIO-SILLA-REST-API';

// Function to generate a random string using cryptographic random bytes
export const random = () => crypto.randomBytes(128).toString('base64');

// Function for generating an authentication hash using HMAC with SHA-256
export const authentication = (salt: string, password: string) => {
    // Combining salt and password with a '/' separator and creating an HMAC hash with SHA-256
    const hash = crypto.createHmac('sha256', [salt, password].join('/'))
                                  .update(SECRET)
                                  .digest('hex');
    return hash;
};
