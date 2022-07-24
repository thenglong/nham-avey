import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dish } from "src/dishes/dish.entity"
import { DishResolver } from "src/dishes/dishes.resolver"
import { DishService } from "src/dishes/dishes.service"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Dish, Restaurant])],
  providers: [DishService, DishResolver],
})
export class DishModule {}
