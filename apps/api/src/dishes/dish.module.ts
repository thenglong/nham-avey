import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dish } from "src/dishes/dish.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  providers: [],
})
export class DishModule {}
