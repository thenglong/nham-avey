import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Image } from "src/images/entities/image.entity"
import { ImageService } from "src/images/images.service"

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImagesModule {}
