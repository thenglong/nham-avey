import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [],
})
export class RestaurantsModule {}
