import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CategoryResolver } from "src/restaurants/categories.resolver"
import { DishResolver } from "src/restaurants/dishes.resolver"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { RestaurantResolver } from "src/restaurants/restaurants.resolver"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category, Dish]), UsersModule],
  providers: [RestaurantResolver, RestaurantService, CategoryResolver, DishResolver],
})
export class RestaurantsModule {}
