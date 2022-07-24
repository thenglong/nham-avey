import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CityResolver } from "src/cities/cities.resolver"
import { CityService } from "src/cities/cities.service"
import { City } from "src/cities/city.entity"

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule {}
