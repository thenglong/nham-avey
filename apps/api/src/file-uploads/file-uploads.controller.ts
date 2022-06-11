import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { FileUploadsService } from "src/file-uploads/file-uploads.service"

import { ImageFilePipe } from "../common/pipe/image-file.pipe"

@Controller("upload")
export class FileUploadsController {
  constructor(private readonly fileUploadsService: FileUploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(new ImageFilePipe({ required: true }))
    file: Express.Multer.File
  ): Promise<string> {
    return this.fileUploadsService.upload(file)
  }
}
