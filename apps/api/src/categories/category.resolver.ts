import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { CategoryService } from "src/categories/categories.service"
import { Category } from "src/categories/category.entity"
import {
  AdminCreateCategoryInput,
  AdminCreateCategoryOutput,
  AdminUpdateCategoryInput,
  AdminUpdateCategoryOutput,
  AllCategoriesOutput,
  PaginationCategoriesOutput,
} from "src/categories/dtos"
import { IdArg } from "src/common/dtos/id.dto"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { UserRole } from "src/users/entities/user.entity"

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @ResolveField(returns => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.categoryService.countRestaurantsByCategory(category)
  }

  @Query(returns => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.categoryService.findAllCategories()
  }

  @Query(returns => PaginationCategoriesOutput)
  categories(@Args() args: PaginationWithSearchArgs): Promise<PaginationCategoriesOutput> {
    return this.categoryService.findCategories(args)
  }

  @Mutation(returns => CoreOutput)
  @Roles(UserRole.Admin)
  adminDeleteCategory(@GraphqlAuthUser() decodedIdToken: DecodedIdToken, @Args() arg: IdArg): Promise<CoreOutput> {
    return this.categoryService.deleteCategoryByAdmin(decodedIdToken.uid, arg.id)
  }
  @Mutation(returns => AdminCreateCategoryOutput)
  @Roles(UserRole.Admin)
  adminCreateCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminCreateCategoryInput,
  ): Promise<AdminCreateCategoryOutput> {
    return this.categoryService.createCategoryByAdmin(decodedIdToken.uid, input)
  }

  @Mutation(returns => AdminUpdateCategoryOutput)
  @Roles(UserRole.Admin)
  adminUpdateCategory(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") input: AdminUpdateCategoryInput,
  ): Promise<AdminUpdateCategoryOutput> {
    return this.categoryService.updateCategoryByAdmin(decodedIdToken.uid, input)
  }
}
