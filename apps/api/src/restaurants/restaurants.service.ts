import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DecodedIdToken, UserRecord } from "firebase-admin/auth"
import { AllCategoriesOutput } from "src/restaurants/dtos/all-categories.dto"
import { CategoryInput, CategoryOutput } from "src/restaurants/dtos/category.dto"
import { CreateDishInput, CreateDishOutput } from "src/restaurants/dtos/create-dish.dto"
import {
  AdminCreateRestaurantByInput,
  CreateRestaurantOutput,
  VendorCreateRestaurantInput,
} from "src/restaurants/dtos/create-restaurant.dto"
import { DeleteDishInput, DeleteDishOutput } from "src/restaurants/dtos/delete-dish.dto"
import { DeleteRestaurantOutput } from "src/restaurants/dtos/delete-restaurant.dto"
import { EditDishInput, EditDishOutput } from "src/restaurants/dtos/edit-dish.dto"
import { UpdateRestaurantInput, UpdateRestaurantOutput } from "src/restaurants/dtos/edit.restaurant.dto"
import { MyRestaurantOutput } from "src/restaurants/dtos/my-restaurant"
import { PaginatedRestaurantsOutput } from "src/restaurants/dtos/my-restaurants.dto"
import { RestaurantArgs, RestaurantOutput } from "src/restaurants/dtos/restaurant.dto"
import { RestaurantsArgs } from "src/restaurants/dtos/restaurants.dto"
import { SearchRestaurantArgs, SearchRestaurantOutput } from "src/restaurants/dtos/search-restaurant.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"
import { Equal, ILike, Repository } from "typeorm"

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly userService: UserService,
  ) {}

  private async getOrCreateCategory(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase()
    const categorySlug = categoryName.replace(/ /g, "-")
    let category = await this.categoryRepo.findOneBy({ slug: categorySlug })
    if (!category) {
      category = await this.categoryRepo.save(
        this.categoryRepo.create({
          slug: categorySlug,
          name: categoryName,
        }),
      )
    }
    return category
  }

  async createRestaurant(vendorId: UserRecord["uid"], createRestaurantInput: VendorCreateRestaurantInput): Promise<CreateRestaurantOutput> {
    try {
      const vendorEntity = await this.userService.findUserById(vendorId)
      if (!vendorEntity) {
        throw new Error(`Vendor with id ${vendorId} not found`)
      }
      const restaurant = this.restaurantRepo.create(createRestaurantInput)
      restaurant.vendor = vendorEntity
      restaurant.category = await this.getOrCreateCategory(createRestaurantInput.categoryName)

      await this.restaurantRepo.save(restaurant)
      return {
        ok: true,
        restaurant,
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
    createRestaurantInput: AdminCreateRestaurantByInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const vendorEntity = await this.userService.findUserById(createRestaurantInput.vendorId)
      if (!vendorEntity) {
        throw new Error(`Vendor with id ${createRestaurantInput.vendorId} not found`)
      }

      const restaurant = this.restaurantRepo.create(createRestaurantInput)
      restaurant.vendor = vendorEntity
      restaurant.category = await this.getOrCreateCategory(createRestaurantInput.categoryName)
      await this.restaurantRepo.save(restaurant)
      return {
        ok: true,
        restaurant,
      }
    } catch (err) {
      return {
        ok: false,
        error: `[App] Could not create restaurant`,
      }
    }
  }

  async updateRestaurantByVendor(
    vendorId: UserRecord["uid"],
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOneByOrFail({
        id: updateRestaurantInput.restaurantId,
      })
      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      if (vendorId !== restaurant.vendorId) {
        return {
          ok: false,
          error: "[App] You can't update a restaurant that you don't own",
        }
      }

      let category: Category | null = null
      if (updateRestaurantInput.categoryName) {
        category = await this.getOrCreateCategory(updateRestaurantInput.categoryName)
      }

      await this.restaurantRepo.save([
        {
          id: updateRestaurantInput.restaurantId,
          ...updateRestaurantInput,
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

  async updateRestaurant(updateRestaurantInput: UpdateRestaurantInput): Promise<UpdateRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOneByOrFail({
        id: updateRestaurantInput.restaurantId,
      })
      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      let category: Category | null = null
      if (updateRestaurantInput.categoryName) {
        category = await this.getOrCreateCategory(updateRestaurantInput.categoryName)
      }

      await this.restaurantRepo.save([
        {
          id: updateRestaurantInput.restaurantId,
          ...updateRestaurantInput,
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

  async deleteRestaurant(decodedIdToken: DecodedIdToken, restaurantId: Restaurant["id"]): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })

      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      if (!decodedIdToken.roles.includes(UserRole.Admin) && decodedIdToken.uid !== restaurant.vendorId) {
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
        pageCount: Math.ceil(totalResults / 25),
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not load category",
      }
    }
  }

  async getRestaurantsByPublic({ options: { page, take, skip }, searchQuery }: RestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    try {
      const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

      if (searchQuery) {
        queryBuilder.andWhere(
          `restaurant.name ILIKE :searchQuery
                 OR
                 restaurant.address ILIKE :searchQuery`,
          { searchQuery },
        )
      }

      const matchedCount = await queryBuilder.getCount()

      queryBuilder
        .skip(skip)
        .take(take)
        .leftJoinAndSelect("restaurant.vendor", "vendor") //
        .leftJoinAndSelect("restaurant.orders", "orders") //
        .leftJoinAndSelect("restaurant.menu", "menu") //
        .orderBy("restaurant.isPromoted", "DESC")
        .addOrderBy("restaurant.name", "ASC")

      const { entities } = await queryBuilder.getRawAndEntities()

      const pageCount = Math.ceil(matchedCount / take)
      return {
        restaurants: entities,
        pageCount,
        hasPrevious: page > pageCount,
        hasNext: page < pageCount,
        matchedCount,
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find restaurantRepo",
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
        matchedCount: totalResults,
        pageCount: Math.ceil(totalResults / 25),
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not search for restaurantRepo",
      }
    }
  }

  async createDish(vendorId: UserRecord["uid"], createDishInput: CreateDishInput): Promise<CreateDishOutput> {
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

      if (vendorId !== restaurant.vendorId) {
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

  async editDish(vendorId: UserRecord["uid"], editDishInput: EditDishInput): Promise<EditDishOutput> {
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

      if (dish.restaurant.vendorId !== vendorId) {
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

  async deleteDish(vendorId: UserRecord["uid"], { dishId }: DeleteDishInput): Promise<DeleteDishOutput> {
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

      if (dish.restaurant.vendorId !== vendorId) {
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

  async getRestaurantsByVendor(
    vendorId: UserRecord["uid"],
    { searchQuery, options: { skip, page, take } }: RestaurantsArgs,
  ): Promise<PaginatedRestaurantsOutput> {
    try {
      const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

      queryBuilder.where(`restaurant.vendorId = :vendorId`, { vendorId })

      if (searchQuery) {
        queryBuilder.andWhere(
          `restaurant.name ILIKE :searchQuery
                 OR
                 restaurant.address ILIKE :searchQuery`,
          { searchQuery },
        )
      }

      const matchedCount = await queryBuilder.getCount()

      queryBuilder
        .skip(skip)
        .take(take)
        .leftJoinAndSelect("restaurant.vendor", "vendor") //
        .leftJoinAndSelect("restaurant.orders", "orders") //
        .leftJoinAndSelect("restaurant.menu", "menu") //
        .orderBy("restaurant.isPromoted", "DESC")
        .addOrderBy("restaurant.name", "ASC")

      const { entities } = await queryBuilder.getRawAndEntities()

      const pageCount = Math.ceil(matchedCount / take)
      return {
        restaurants: entities,
        pageCount,
        hasPrevious: page > pageCount,
        hasNext: page < pageCount,
        matchedCount,
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find restaurantRepo",
      }
    }
  }

  async getRestaurantsByAdmin({ searchQuery, options: { skip, page, take } }: RestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    try {
      const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

      if (searchQuery) {
        queryBuilder.andWhere(
          `restaurant.name ILIKE :searchQuery
                   OR
                 restaurant.address ILIKE :searchQuery`,
          { searchQuery },
        )
      }

      const matchedCount = await queryBuilder.getCount()

      queryBuilder
        .skip(skip)
        .take(take)
        .leftJoinAndSelect("restaurant.vendor", "vendor") //
        .leftJoinAndSelect("restaurant.orders", "orders") //
        .leftJoinAndSelect("restaurant.menu", "menu") //
        .orderBy("restaurant.isPromoted", "DESC")
        .addOrderBy("restaurant.name", "ASC")

      const { entities } = await queryBuilder.getRawAndEntities()

      const pageCount = Math.ceil(matchedCount / take)
      return {
        restaurants: entities,
        pageCount,
        hasPrevious: page > pageCount,
        hasNext: page < pageCount,
        matchedCount,
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find restaurantRepo",
      }
    }
  }

  async findRestaurantByIdAndVendorId(vendorId: UserRecord["uid"], restaurantId: Restaurant["id"]): Promise<MyRestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: {
          id: restaurantId,
          vendorId: Equal(vendorId),
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
