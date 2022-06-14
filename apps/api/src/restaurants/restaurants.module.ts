import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver,
} from "src/restaurants/restaurants.resolver"
import { RestaurantService } from "src/restaurants/restaurants.service"

import { Category } from "./entities/category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category, Dish])],
  providers: [RestaurantResolver, RestaurantService, CategoryResolver, DishResolver],
})
export class RestaurantsModule {}
