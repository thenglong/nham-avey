import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CategoryModule } from "src/categories/categories.module"
import { CityModule } from "src/cities/cities.module"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { RestaurantResolver } from "src/restaurants/restaurants.resolver"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]), UsersModule, CategoryModule, CityModule],
  providers: [RestaurantService, RestaurantResolver],
})
export class RestaurantsModule {}
