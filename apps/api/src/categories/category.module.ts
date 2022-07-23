import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Category } from "src/categories/category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [],
})
export class CategoryModule {}
