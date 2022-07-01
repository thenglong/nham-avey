import { FirebaseOptions } from "firebase/app"

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG as string
) as FirebaseOptions

export default firebaseConfig
