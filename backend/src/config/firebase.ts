import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const firestoreEnv = process.env.NODE_ENV;

let serviceAccountKeyPath;

if (firestoreEnv === 'production') {
  serviceAccountKeyPath = process.env.PROD_FIRESTORE_KEY;
} else if (firestoreEnv === 'test') {
  serviceAccountKeyPath = process.env.TEST_FIRESTORE_KEY;
} else {
  throw new Error(
    'Invalid FIRESTORE_ENV value. Must be "production" or "test".'
  );
}

const serviceAccountKey = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, serviceAccountKeyPath), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const db = admin.firestore();

export { admin, db };
