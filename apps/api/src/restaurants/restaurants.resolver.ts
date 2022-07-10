import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { AllCategoriesOutput } from "src/restaurants/dtos/all-categories.dto"
import { CategoryInput, CategoryOutput } from "src/restaurants/dtos/category.dto"
import { CreateDishInput, CreateDishOutput } from "src/restaurants/dtos/create-dish.dto"
import { CreateRestaurantInput, CreateRestaurantOutput } from "src/restaurants/dtos/create-restaurant.dto"
import { DeleteDishInput, DeleteDishOutput } from "src/restaurants/dtos/delete-dish.dto"
import { DeleteRestaurantInput, DeleteRestaurantOutput } from "src/restaurants/dtos/delete-restaurant.dto"
import { EditDishInput, EditDishOutput } from "src/restaurants/dtos/edit-dish.dto"
import { EditRestaurantInput, EditRestaurantOutput } from "src/restaurants/dtos/edit.restaurant.dto"
import { MyRestaurantInput, MyRestaurantOutput } from "src/restaurants/dtos/my-restaurant"
import { MyRestaurantsOutput } from "src/restaurants/dtos/my-restaurants.dto"
import { RestaurantArgs, RestaurantOutput } from "src/restaurants/dtos/restaurant.dto"
import { RestaurantsArgs, RestaurantsOutput } from "src/restaurants/dtos/restaurants.dto"
import { SearchRestaurantArgs, SearchRestaurantOutput } from "src/restaurants/dtos/search-restaurant.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { RestaurantService } from "src/restaurants/restaurants.service"
import { User, UserRole } from "src/users/entities/user.entity"

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateRestaurantOutput)
  @Roles(UserRole.Vendor)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args("input") createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurant(authUser, createRestaurantInput)
  }

  @Query(() => MyRestaurantsOutput)
  @Roles(UserRole.Vendor)
  myRestaurants(@AuthUser() owner: User): Promise<MyRestaurantsOutput> {
    return this.restaurantService.myRestaurants(owner)
  }

  @Query(() => MyRestaurantOutput)
  @Roles(UserRole.Vendor)
  myRestaurant(@AuthUser() owner: User, @Args("input") myRestaurantInput: MyRestaurantInput): Promise<MyRestaurantOutput> {
    return this.restaurantService.myRestaurant(owner, myRestaurantInput)
  }

  @Mutation(() => EditRestaurantOutput)
  @Roles(UserRole.Vendor)
  editRestaurant(@AuthUser() owner: User, @Args("input") editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurant(owner, editRestaurantInput)
  }

  @Mutation(() => DeleteRestaurantOutput)
  @Roles(UserRole.Vendor)
  deleteRestaurant(@AuthUser() owner: User, @Args("input") deleteRestaurantInput: DeleteRestaurantInput): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(owner, deleteRestaurantInput)
  }

  @Query(() => RestaurantsOutput)
  restaurants(@Args() restaurantsArgs: RestaurantsArgs): Promise<RestaurantsOutput> {
    return this.restaurantService.allRestaurants(restaurantsArgs)
  }

  @Query(() => RestaurantOutput)
  restaurant(@Args() restaurantArgs: RestaurantArgs): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(restaurantArgs)
  }

  @Query(() => SearchRestaurantOutput)
  searchRestaurant(@Args() searchRestaurantArgs: SearchRestaurantArgs): Promise<SearchRestaurantOutput> {
    return this.restaurantService.searchRestaurantByName(searchRestaurantArgs)
  }
}

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField(() => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantService.countRestaurants(category)
  }

  @Query(() => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories()
  }

  @Query(() => CategoryOutput)
  category(@Args() categoryInput: CategoryInput): Promise<CategoryOutput> {
    return this.restaurantService.findCategoryBySlug(categoryInput)
  }
}

@Resolver(() => Dish)
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => CreateDishOutput)
  @Roles(UserRole.Vendor)
  createDish(@AuthUser() owner: User, @Args("input") createDishInput: CreateDishInput): Promise<CreateDishOutput> {
    return this.restaurantService.createDish(owner, createDishInput)
  }

  @Mutation(() => EditDishOutput)
  @Roles(UserRole.Vendor)
  editDish(@AuthUser() owner: User, @Args("input") editDishInput: EditDishInput): Promise<EditDishOutput> {
    return this.restaurantService.editDish(owner, editDishInput)
  }

  @Mutation(() => DeleteDishOutput)
  @Roles(UserRole.Vendor)
  deleteDish(@AuthUser() owner: User, @Args("input") deleteDishInput: DeleteDishInput): Promise<EditDishOutput> {
    return this.restaurantService.deleteDish(owner, deleteDishInput)
  }
}
