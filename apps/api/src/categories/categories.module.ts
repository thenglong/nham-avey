import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CategoryService } from "src/categories/categories.service"
import { Category } from "src/categories/category.entity"
import { CategoryResolver } from "src/categories/category.resolver"

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
