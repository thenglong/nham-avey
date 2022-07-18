import { FirebaseOptions } from "firebase/app"

/**
 * @deprecated use config by app base instead
 */
const firebaseConfig = JSON.parse(
  process.env.NX_FIREBASE_CONFIG_JSON as string
) as FirebaseOptions

export default firebaseConfig
