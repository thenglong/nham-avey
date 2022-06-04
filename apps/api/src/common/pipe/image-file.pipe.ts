import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common"

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024

@Injectable()
export class ImageFilePipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  private readonly allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"]
  private readonly required: boolean
  private readonly maxFileSize: number

  constructor({ required = true, maxFileSize = DEFAULT_MAX_FILE_SIZE }) {
    this.required = required
    this.maxFileSize = maxFileSize
  }

  transform(
    value: Express.Multer.File,
    _metadata: ArgumentMetadata
  ): Express.Multer.File {
    if (this.required && !value) throw new BadRequestException("File is required")

    if (value) {
      if (value.size > DEFAULT_MAX_FILE_SIZE)
        throw new BadRequestException(
          `File size is too big, max size is ${this.maxFileSize} bytes`
        )
      if (!this.allowedMimeTypes.includes(value.mimetype))
        throw new BadRequestException("File type is not allowed")
    }

    return value
  }
}
