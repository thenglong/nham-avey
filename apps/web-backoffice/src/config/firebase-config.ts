import { FirebaseOptions } from "firebase/app"

const firebaseConfig = JSON.parse(
  process.env.NX_BO_FIREBASE_CONFIG_JSON as string
) as FirebaseOptions

export default firebaseConfig
