import { FirebaseError, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getMessaging } from "firebase/messaging"
import { getMessaging as getMessageSw } from "firebase/messaging/sw"

import firebaseConfig from "src/config/firebase-config"
import { isClient } from "src/utils/common-utils"

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const messaging = isClient ? getMessaging(app) : null

const messagingSw = isClient ? getMessageSw(app) : null

const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY

const getErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password"
    case "auth/too-many-requests":
      return "Too many requests, try again later"
    default:
      return "Unknown error"
  }
}

const firebaseServices = {
  auth,
  messaging,
  messagingSw,
  vapidKey,
  getErrorMessage,
}

export default firebaseServices
