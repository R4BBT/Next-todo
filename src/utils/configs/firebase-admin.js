import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// https://firebase.google.com/docs/reference/admin/node/firebase-admin.appoptions.md#appoptions_interface
// https://firebase.google.com/docs/admin/setup#initialize-sdk
// You need to set the GOOGLE_APPLICATION_DEFAULT environment variable if you are using applicationDefault() for credential
// Otherwise you can pass the serviceAccount key path with the cert() function, the service account key is a JSON file which can be downloaded from the firebase console
// The path passed to cert() must be absolute, relative paths will throw an error
// cert() will also take in a serviceAccount object

const serviceAccount = require('../../../key.json')
const credential = cert(serviceAccount)

let app = getApps()[0]

if (!getApps().length) {
  // const app = initializeApp({ credential: applicationDefault() });
  app = initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
    credential: credential,
  })
  // Figure out how to pass credentials via path to service account (done)
}

export { app }
export const adminAuth = getAuth(app)
