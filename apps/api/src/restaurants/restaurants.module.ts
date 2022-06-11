import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { CategoryRepository } from "src/restaurants/repositories/category.repository"
import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver,
} from "src/restaurants/restaurants.resolver"
import { RestaurantService } from "src/restaurants/restaurants.service"

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository, Dish])],
  providers: [RestaurantResolver, RestaurantService, CategoryResolver, DishResolver],
})
export class RestaurantsModule {}
