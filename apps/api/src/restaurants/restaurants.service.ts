import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DecodedIdToken, UserRecord } from "firebase-admin/auth"
import { AllCategoriesOutput } from "src/restaurants/dtos/all-categories.dto"
import { PaginatedCategoryRestaurantOutput, PaginationCategoryRestaurantArgs } from "src/restaurants/dtos/category.dto"
import { CreateDishInput, CreateDishOutput } from "src/restaurants/dtos/create-dish.dto"
import { AdminCreateRestaurantInput, CreateRestaurantOutput, VendorCreateRestaurantInput } from "src/restaurants/dtos/create-restaurant.dto"
import { DeleteDishInput, DeleteDishOutput } from "src/restaurants/dtos/delete-dish.dto"
import { DeleteRestaurantOutput } from "src/restaurants/dtos/delete-restaurant.dto"
import { EditDishInput, EditDishOutput } from "src/restaurants/dtos/edit-dish.dto"
import { AdminUpdateRestaurantInput, UpdateRestaurantOutput, VendorUpdateRestaurantInput } from "src/restaurants/dtos/edit.restaurant.dto"
import { MyRestaurantOutput } from "src/restaurants/dtos/my-restaurant"
import { PaginatedRestaurantsOutput } from "src/restaurants/dtos/my-restaurants.dto"
import { RestaurantOutput } from "src/restaurants/dtos/restaurant.dto"
import { PaginationRestaurantsArgs } from "src/restaurants/dtos/restaurants.dto"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"
import { Equal, Repository, SelectQueryBuilder } from "typeorm"

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

  private async getOrCreateCategories(names: string[]): Promise<Category[]> {
    return Promise.all<Category>(
      names.map(async name => {
        const slug = name.trim().toLowerCase().replace(/ /g, "-")
        let category = await this.categoryRepo.findOneBy({ slug })
        if (!category) {
          const entity = this.categoryRepo.create({ name, slug })
          category = await this.categoryRepo.save(entity)
        }
        return category
      }),
    )
  }

  async createRestaurantByVendor(vendorId: UserRecord["uid"], input: VendorCreateRestaurantInput): Promise<CreateRestaurantOutput> {
    const { categories, ...restaurantPayload } = input
    try {
      const vendorEntity = await this.userService.findUserById(vendorId)
      if (!vendorEntity) {
        throw new Error(`Vendor with id ${vendorId} not found`)
      }

      const categoryEntities = await this.getOrCreateCategories(categories ?? [])

      const restaurant = this.restaurantRepo.create(restaurantPayload)
      restaurant.vendor = vendorEntity
      restaurant.categories = categoryEntities

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

  async createRestaurantByAdmin(admin: DecodedIdToken, input: AdminCreateRestaurantInput): Promise<CreateRestaurantOutput> {
    try {
      const { categories, vendorId, ...restaurantPayload } = input

      const vendorEntity = await this.userService.findUserById(vendorId)
      if (!vendorEntity) {
        throw new Error(`Vendor with id ${input.vendorId} not found`)
      }

      const categoryEntities = await this.getOrCreateCategories(categories ?? [])

      const restaurant = this.restaurantRepo.create(restaurantPayload)
      restaurant.vendor = vendorEntity
      restaurant.categories = categoryEntities
      const saved = await this.restaurantRepo.save(restaurant)

      return {
        ok: true,
        restaurant: saved,
      }
    } catch (err) {
      return {
        ok: false,
        error: `[App] Could not create restaurant`,
      }
    }
  }

  async updateRestaurantByVendor(vendorId: UserRecord["uid"], input: VendorUpdateRestaurantInput): Promise<UpdateRestaurantOutput> {
    try {
      const { restaurantId, categories, ...restaurantPayload } = input
      const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })
      if (!restaurant) {
        return { ok: false, error: "[App] Restaurant not found" }
      }

      if (vendorId !== restaurant.vendorId) {
        return { ok: false, error: "[App] You can't update a restaurant that you don't own" }
      }

      const categoryEntities = await this.getOrCreateCategories(categories ?? [])

      await this.restaurantRepo.save({
        id: restaurantId,
        ...restaurantPayload,
        categories: categoryEntities,
      })
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

  async updateRestaurantByAdmin(input: AdminUpdateRestaurantInput): Promise<UpdateRestaurantOutput> {
    try {
      const { restaurantId, categories, ...restaurantPayload } = input
      const restaurant = await this.restaurantRepo.findOneBy({
        id: restaurantId,
      })
      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      const categoryEntities = await this.getOrCreateCategories(categories ?? [])

      await this.restaurantRepo.save({
        id: input.restaurantId,
        ...restaurantPayload,
        vendorId: input.vendorId,
        categories: categoryEntities,
      })
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

  countRestaurantsByCategory(category: Category) {
    return this.restaurantRepo
      .createQueryBuilder("restaurant")
      .leftJoinAndSelect("restaurant.categories", "category")
      .where(`category.id = :categoryId`, { categoryId: category.id })
      .getCount()
  }

  async findRestaurantsByCategorySlug({
    slug,
    pageOptions: { page, take, skip },
  }: PaginationCategoryRestaurantArgs): Promise<PaginatedCategoryRestaurantOutput> {
    try {
      const category = await this.categoryRepo.findOne({ where: { slug } })
      if (!category) {
        return { ok: false, error: "[App] Category not found" }
      }

      const restaurants = await this.restaurantRepo
        .createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.categories", "category")
        .leftJoinAndSelect("restaurant.vendor", "vendor")
        .where(`category.id = :categoryId`, { categoryId: category.id })
        .orderBy("restaurant.isPromoted", "DESC")
        .take(take)
        .skip(skip)
        .getMany()

      const matchedCount = await this.countRestaurantsByCategory(category)
      const pageCount = Math.ceil(matchedCount / take)
      return {
        category,
        restaurants,
        pageCount,
        hasPrevious: page > 1 && page <= pageCount,
        hasNext: page < pageCount,
        matchedCount,
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not load category",
      }
    }
  }

  async getRestaurantsByPublic(args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    try {
      const {
        pageOptions: { page, take, skip },
        searchQuery,
      } = args
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
        hasPrevious: page > 1 && page <= pageCount,
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

  async findRestaurantById(id: Restaurant["id"]): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
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

  async getRestaurantsByVendor(vendorId: UserRecord["uid"], args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    try {
      const {
        searchQuery,
        pageOptions: { skip, page, take },
      } = args

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
        hasPrevious: page > 1 && page <= pageCount,
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

  async getRestaurantsByAdmin(args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    try {
      const {
        searchQuery,
        pageOptions: { skip, page, take },
      } = args
      const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

      if (searchQuery) {
        queryBuilder.andWhere(
          `
            restaurant.name ILIKE :searchQuery
            OR
            restaurant.address ILIKE :searchQuery
          `,
          { searchQuery },
        )
      }

      const matchedCount = await queryBuilder.getCount()

      queryBuilder
        .skip(skip)
        .take(take)
        .leftJoinAndSelect("restaurant.vendor", "vendor") //
        .leftJoinAndSelect("restaurant.categories", "categories") //
        .leftJoinAndSelect("restaurant.orders", "orders") //
        .leftJoinAndSelect("restaurant.menu", "menu") //
        .orderBy("restaurant.isPromoted", "DESC")
        .addOrderBy("restaurant.name", "ASC")

      const { entities } = await queryBuilder.getRawAndEntities()

      const pageCount = Math.ceil(matchedCount / take)
      return {
        restaurants: entities,
        pageCount,
        hasPrevious: page > 1 && page <= pageCount,
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
