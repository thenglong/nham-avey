import { ModuleMetadata } from "@nestjs/common/interfaces"
import * as admin from "firebase-admin"

export type FirebaseAdminModuleOptions = admin.AppOptions

export interface FirebaseAdminModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<FirebaseAdminModuleOptions> | FirebaseAdminModuleOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[]
}
