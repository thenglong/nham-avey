import { FirebaseError, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getMessaging } from "firebase/messaging"
import { getMessaging as getMessageSw } from "firebase/messaging/sw"
import firebaseConfig from "src/config/firebase-config"

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

const messaging = getMessaging(firebaseApp)

const messagingSw = getMessageSw(firebaseApp)

const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY

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

const firebaseService = {
  auth,
  messaging,
  messagingSw,
  vapidKey,
  getErrorMessage,
}

export default firebaseService
