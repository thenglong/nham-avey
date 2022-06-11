import { Module } from "@nestjs/common"
import { UploadsController } from "src/uploads/uploads.controller"

@Module({
  controllers: [UploadsController],
})
export class UploadsModule {}
