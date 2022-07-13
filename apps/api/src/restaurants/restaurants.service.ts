import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DecodedIdToken } from "firebase-admin/auth"
import { AllCategoriesOutput } from "src/restaurants/dtos/all-categories.dto"
import { CategoryInput, CategoryOutput } from "src/restaurants/dtos/category.dto"
import { CreateDishInput, CreateDishOutput } from "src/restaurants/dtos/create-dish.dto"
import { CreateRestaurantByAdminInput, CreateRestaurantInput, CreateRestaurantOutput } from "src/restaurants/dtos/create-restaurant.dto"
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
import { CategoryRepository } from "src/restaurants/repositories/category.repository"
import { User } from "src/users/entities/user.entity"
import { ILike, Repository, Equal } from "typeorm"

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async createRestaurant(owner: DecodedIdToken, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurantRepo.create(createRestaurantInput)
      newRestaurant.ownerId = owner.uid
      newRestaurant.category = await this.categoryRepo.getOrCreate(createRestaurantInput.categoryName)

      await this.restaurantRepo.save(newRestaurant)
      return {
        ok: true,
        restaurantId: newRestaurant.id,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not create restaurant",
      }
    }
  }

  async createRestaurantByAdmin(
    admin: DecodedIdToken,
    createRestaurantInput: CreateRestaurantByAdminInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurantRepo.create(createRestaurantInput)
      newRestaurant.category = await this.categoryRepo.getOrCreate(createRestaurantInput.categoryName)

      await this.restaurantRepo.save(newRestaurant)
      return {
        ok: true,
        restaurantId: newRestaurant.id,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not create restaurant",
      }
    }
  }

  async updateRestaurant(owner: DecodedIdToken, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOneByOrFail({
        id: editRestaurantInput.restaurantId,
      })
      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      if (owner.uid !== restaurant.ownerId) {
        return {
          ok: false,
          error: "[App] You can't edit a restaurant that you don't own",
        }
      }

      let category: Category | null = null
      if (editRestaurantInput.categoryName) {
        category = await this.categoryRepo.getOrCreate(editRestaurantInput.categoryName)
      }

      await this.restaurantRepo.save([
        {
          id: editRestaurantInput.restaurantId,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ])
      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not edit Restaurant",
      }
    }
  }

  async deleteRestaurant(owner: DecodedIdToken, { restaurantId }: DeleteRestaurantInput): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })

      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      if (owner.uid !== restaurant.ownerId) {
        return {
          ok: false,
          error: "[App] You can't delete a restaurant that you don't own",
        }
      }

      await this.restaurantRepo.delete(restaurantId)

      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not delete restaurant",
      }
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categoryRepo.find()
      return {
        ok: true,
        categories,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not load categoryRepo",
      }
    }
  }

  countRestaurants(category: Category) {
    return this.restaurantRepo.count({ where: { category: Equal(category) } })
  }

  async findCategoryBySlug({ slug, page }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categoryRepo.findOne({ where: { slug } })

      if (!category) {
        return {
          ok: false,
          error: "[App] Category not found",
        }
      }

      const restaurants = await this.restaurantRepo.find({
        where: {
          category: Equal(category),
        },
        take: 25,
        skip: (page - 1) * 25,
        order: {
          isPromoted: "DESC",
        },
      })
      category.restaurants = restaurants
      const totalResults = await this.countRestaurants(category)

      return {
        ok: true,
        category,
        totalPages: Math.ceil(totalResults / 25),
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not load category",
      }
    }
  }

  async allRestaurants({ page }: RestaurantsArgs): Promise<RestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurantRepo.findAndCount({
        skip: (page - 1) * 3,
        take: 3,
        order: {
          isPromoted: "DESC",
        },
      })

      return {
        ok: true,
        results: restaurants,
        totalPages: Math.ceil(totalResults / 3),
        totalResults,
      }
    } catch (err) {
      return {
        ok: false,
        error: "[App] Could not load restaurantRepo",
      }
    }
  }

  async findRestaurantById({ restaurantId }: RestaurantArgs): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id: restaurantId },
        relations: ["menu"],
      })

      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }
      return {
        ok: true,
        restaurant,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find restaurant",
      }
    }
  }

  async searchRestaurantByName({ query, page }: SearchRestaurantArgs): Promise<SearchRestaurantOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurantRepo.findAndCount({
        where: {
          name: ILike(`%${query}%`),
        },
        skip: (page - 1) * 25,
        take: 25,
      })
      return {
        ok: true,
        restaurants,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not search for restaurantRepo",
      }
    }
  }

  async createDish(owner: DecodedIdToken, createDishInput: CreateDishInput): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOneBy({
        id: createDishInput.restaurantId,
      })

      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      if (owner.uid !== restaurant.ownerId) {
        return {
          ok: false,
          error: "[App] You can't do that",
        }
      }

      await this.dishRepo.save(this.dishRepo.create({ ...createDishInput, restaurant }))

      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: "[App] Could not create the dish",
      }
    }
  }

  async editDish(owner: DecodedIdToken, editDishInput: EditDishInput): Promise<EditDishOutput> {
    try {
      const dish = await this.dishRepo.findOne({
        where: { id: editDishInput.dishId },
        relations: ["restaurant"],
      })

      if (!dish) {
        return {
          ok: false,
          error: "[App] Dish not found",
        }
      }

      if (dish.restaurant.ownerId !== owner.uid) {
        return {
          ok: false,
          error: "[App] You can't do that",
        }
      }

      await this.dishRepo.save([
        {
          id: editDishInput.dishId,
          ...editDishInput,
        },
      ])
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: "[App] Could not edit dish",
      }
    }
  }

  async deleteDish(owner: DecodedIdToken, { dishId }: DeleteDishInput): Promise<DeleteDishOutput> {
    try {
      const dish = await this.dishRepo.findOne({
        where: { id: dishId },
        relations: ["restaurant"],
      })

      if (!dish) {
        return {
          ok: false,
          error: "[App] Dish not found",
        }
      }

      if (dish.restaurant.ownerId !== owner.uid) {
        return {
          ok: false,
          error: "[App] You can't do that",
        }
      }

      await this.dishRepo.delete(dishId)

      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not delete dish",
      }
    }
  }

  async myRestaurants(owner: DecodedIdToken): Promise<MyRestaurantsOutput> {
    try {
      const restaurants = await this.restaurantRepo.findBy({ ownerId: Equal(owner.uid) })
      return {
        restaurants,
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find restaurantRepo",
      }
    }
  }

  async myRestaurant(owner: DecodedIdToken, { id }: MyRestaurantInput): Promise<MyRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: {
          id,
          ownerId: Equal(owner.uid),
        },
        relations: ["menu", "orders"],
      })

      return {
        ok: true,
        restaurant,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find restaurantRepo",
      }
    }
  }
}
