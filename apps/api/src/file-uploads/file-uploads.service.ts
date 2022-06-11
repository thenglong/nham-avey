import { Injectable } from "@nestjs/common"
import { getFileExtension } from "src/common/common.helpers"
import { FirebaseStorageService } from "src/firebase-admin/firebase-admin-storage.service"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class FileUploadsService {
  constructor(private storageService: FirebaseStorageService) {}
  async upload(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}.${getFileExtension(file.originalname)}`
    const contentType = file.mimetype

    const bucket = this.storageService.bucket()
    const bucketFile = bucket.file(fileName)

    await bucketFile.save(file.buffer, {
      contentType,
      public: true,
    })
    return bucketFile.publicUrl()
  }
}
