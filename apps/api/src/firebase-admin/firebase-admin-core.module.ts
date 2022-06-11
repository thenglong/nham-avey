import { Global, Module, DynamicModule, Provider } from "@nestjs/common"
import { apps } from "firebase-admin"
import { App, initializeApp } from "firebase-admin/app"

import { FirebaseAuthenticationService } from "./firebase-admin-authentication.service"
import { FirebaseMessagingService } from "./firebase-admin-messaging.service"
import { FirebaseStorageService } from "./firebase-admin-storage.service"
import { FIREBASE_ADMIN_MODULE_OPTIONS } from "./firebase-admin.constant"
import {
  FirebaseAdminModuleAsyncOptions,
  FirebaseAdminModuleOptions,
} from "./firebase-admin.interface"

const PROVIDERS = [
  FirebaseAuthenticationService,
  FirebaseMessagingService,
  FirebaseStorageService,
]
const EXPORTS = [...PROVIDERS]

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  static forRoot(options: FirebaseAdminModuleOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useValue: options,
    }

    const app = apps.length === 0 ? initializeApp(options) : (apps[0] as App)
    const providers = this.createProviders(app)

    return {
      module: FirebaseAdminCoreModule,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static createProviders(app: App): Provider<any>[] {
    return PROVIDERS.map<Provider>(ProviderService => ({
      provide: ProviderService,
      useFactory: () => new ProviderService(app),
    }))
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }

    const providers = this.createAsyncProviders()

    return {
      module: FirebaseAdminCoreModule,
      imports: options.imports,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static createAsyncProviders(): Provider<any>[] {
    return PROVIDERS.map<Provider>(ProviderService => ({
      provide: ProviderService,
      useFactory: (options: FirebaseAdminModuleOptions) => {
        const app = apps.length === 0 ? initializeApp(options) : (apps[0] as App)
        return new ProviderService(app)
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    }))
  }
}
