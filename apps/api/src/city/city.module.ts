import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { City } from "src/city/city.entity"

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [],
})
export class CityModule {}
