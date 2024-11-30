#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { firebaseConfig } from '../lib/firebase.ts';

const ENV_LOCAL = `
NEXT_PUBLIC_FIREBASE_API_KEY='${firebaseConfig.apiKey}'
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN='${firebaseConfig.authDomain}'
NEXT_PUBLIC_FIREBASE_DATABASE_URL='${firebaseConfig.databaseURL}'
NEXT_PUBLIC_FIREBASE_PROJECT_ID='${firebaseConfig.projectId}'
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET='${firebaseConfig.storageBucket}'
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID='${firebaseConfig.messagingSenderId}'
NEXT_PUBLIC_FIREBASE_APP_ID='${firebaseConfig.appId}'
`;
const TRIMMED_ENV_LOCAL = ENV_LOCAL.trim();

const envFileName = ".env.local";

try {
  writeFileSync(envFileName, TRIMMED_ENV_LOCAL);
  console.log(`Congrats! ${envFileName} was successfully generated!`);
} catch (e) {
  console.log(e);
}
