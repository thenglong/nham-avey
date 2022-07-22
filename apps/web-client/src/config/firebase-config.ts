import { FirebaseOptions } from "firebase/app"

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_CLIENT_FIREBASE_CONFIG_JSON || "{}"
) as FirebaseOptions

export default firebaseConfig
