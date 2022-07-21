import { Bucket } from "@google-cloud/storage"
import { Injectable } from "@nestjs/common"
import { App } from "firebase-admin/app"
import { getStorage } from "firebase-admin/storage"

@Injectable()
export class FirebaseStorageService {
  constructor(public readonly app: App) {}

  get storage() {
    if (!this.app) {
      throw new Error("Firebase instance is undefined.")
    }
    return getStorage(this.app)
  }

  bucket(name?: string): Bucket {
    return this.storage.bucket(name)
  }
}
