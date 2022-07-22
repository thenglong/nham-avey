import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DecodedIdToken, UserRecord } from "firebase-admin/auth"
import {
  AdminCreateRestaurantInput,
  AdminUpdateCategoryInput,
  AdminUpdateCategoryOutput,
  AdminUpdateRestaurantInput,
  AllCategoriesOutput,
  CreateDishInput,
  CreateDishOutput,
  CreateRestaurantOutput,
  DeleteCategoryArgs,
  DeleteCategoryOutput,
  DeleteDishArgs,
  DeleteRestaurantOutput,
  MyRestaurantOutput,
  PaginatedCategoryRestaurantOutput,
  PaginatedRestaurantsOutput,
  PaginationCategoryRestaurantArgs,
  PaginationRestaurantsArgs,
  RestaurantOutput,
  UpdateDishInput,
  UpdateDishOutput,
  UpdateRestaurantOutput,
  VendorCreateRestaurantInput,
  VendorUpdateRestaurantInput,
} from "src/restaurants/dtos"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"
import { Equal, Repository } from "typeorm"

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
    const vendorEntity = await this.userService.findUserById(vendorId)

    if (!vendorEntity) return { ok: false, error: `Vendor with id ${vendorId} not found` }

    const categoryEntities = await this.getOrCreateCategories(categories ?? [])
    const restaurant = this.restaurantRepo.create(restaurantPayload)
    restaurant.vendors = [vendorEntity]
    restaurant.categories = categoryEntities

    await this.restaurantRepo.save(restaurant)
    return { ok: true, restaurant }
  }

  async createRestaurantByAdmin(admin: DecodedIdToken, input: AdminCreateRestaurantInput): Promise<CreateRestaurantOutput> {
    const { categories, vendorIds, ...restaurantPayload } = input

    const vendorEntities = await this.userService.findUsersByIds(vendorIds)

    if (vendorEntities.length < vendorIds.length) return { ok: false, error: `Cannot Find All Vendors with ids ${vendorIds.join(", ")}` }

    const categoryEntities = await this.getOrCreateCategories(categories ?? [])
    const restaurant = this.restaurantRepo.create(restaurantPayload)
    restaurant.vendors = vendorEntities
    restaurant.categories = categoryEntities
    const saved = await this.restaurantRepo.save(restaurant)

    return { ok: true, restaurant: saved }
  }

  async updateRestaurantByVendor(vendorId: UserRecord["uid"], input: VendorUpdateRestaurantInput): Promise<UpdateRestaurantOutput> {
    const { restaurantId, categories, ...restaurantPayload } = input
    const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    if (vendorId !== restaurant.vendorId) return { ok: false, error: "[App] You can't update a restaurant that you don't own" }

    const categoryEntities = await this.getOrCreateCategories(categories ?? [])
    await this.restaurantRepo.save({
      id: restaurantId,
      ...restaurantPayload,
      categories: categoryEntities,
    })
    return { ok: true }
  }

  async updateRestaurantByAdmin(input: AdminUpdateRestaurantInput): Promise<UpdateRestaurantOutput> {
    const { restaurantId, categories, vendorIds, ...restaurantPayload } = input

    const existing = await this.restaurantRepo.findOne({
      where: { id: restaurantId },
      relations: ["vendors"],
    })

    if (!existing) {
      return { ok: false, error: "[App] Restaurant not found" }
    }

    const restaurant = Object.assign(existing, restaurantPayload)

    if (vendorIds) {
      const vendorEntities = await this.userService.findUsersByIds(vendorIds)
      if (vendorEntities.length < vendorIds.length) {
        throw new Error(`Cannot Find All Vendors with ids ${vendorIds.join(", ")}`)
      } else if (!vendorEntities.some(vendor => vendor.roles.includes(UserRole.Vendor))) {
        throw new Error(`Users with ids ${vendorIds.join(", ")} includes non-vendor`)
      }
      restaurant.vendors = vendorEntities
    }

    restaurant.categories = await this.getOrCreateCategories(categories ?? [])

    await this.restaurantRepo.save(restaurant)
    return {
      ok: true,
    }
  }

  async deleteRestaurant(decodedIdToken: DecodedIdToken, restaurantId: Restaurant["id"]): Promise<DeleteRestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })
    if (!restaurant)
      return {
        ok: false,
        error: "[App] Restaurant not found",
      }

    if (!decodedIdToken.roles.includes(UserRole.Admin) && decodedIdToken.uid !== restaurant.vendorId)
      return { ok: false, error: "[App] You can't delete a restaurant that you don't own" }

    await this.restaurantRepo.delete(restaurantId)

    return { ok: true }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    const categories = await this.categoryRepo.find()
    return { ok: true, categories }
  }

  countRestaurantsByCategory(category: Category) {
    return this.restaurantRepo
      .createQueryBuilder("restaurant")
      .leftJoinAndSelect("restaurant.categories", "category")
      .where(`category.id = :categoryId`, { categoryId: category.id })
      .getCount()
  }

  async findRestaurantsByCategorySlug(args: PaginationCategoryRestaurantArgs): Promise<PaginatedCategoryRestaurantOutput> {
    const {
      pageOptions: { take, skip },
      slug,
    } = args
    const category = await this.categoryRepo.findOne({ where: { slug } })
    if (!category) return { ok: false, error: "[App] Category not found" }

    const restaurants = await this.restaurantRepo
      .createQueryBuilder("restaurant")
      .leftJoinAndSelect("restaurant.categories", "category")
      .leftJoinAndSelect("restaurant.vendors", "vendor")
      .where(`category.id = :categoryId`, { categoryId: category.id })
      .orderBy("restaurant.isPromoted", "DESC")
      .take(take)
      .skip(skip)
      .getMany()

    const matchedCount = await this.countRestaurantsByCategory(category)
    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return {
      category,
      restaurants,
      ...paginatedOutput,
    }
  }

  async findRestaurantById(id: Restaurant["id"]): Promise<RestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id },
      relations: ["menu"],
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }

    return { ok: true, restaurant }
  }

  async createDishByVendor(vendorId: UserRecord["uid"], input: CreateDishInput): Promise<CreateDishOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({
      id: input.restaurantId,
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    if (vendorId !== restaurant.vendorId) return { ok: false, error: "[App] You can't do that" }

    await this.dishRepo.save(this.dishRepo.create({ ...input, restaurant, createdAt: vendorId }))

    return { ok: true }
  }

  async createDishByAdmin(adminId: UserRecord["uid"], input: CreateDishInput): Promise<CreateDishOutput> {
    const { restaurantId } = input
    const restaurant = await this.restaurantRepo.findOneBy({
      id: restaurantId,
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }

    await this.dishRepo.save(this.dishRepo.create({ ...input, restaurant, createdBy: adminId }))

    return { ok: true }
  }

  async updateDishByVendor(vendorId: UserRecord["uid"], input: UpdateDishInput): Promise<UpdateDishOutput> {
    const dish = await this.dishRepo.findOne({
      where: { id: input.dishId },
      relations: ["restaurant"],
    })

    if (!dish) return { ok: false, error: "[App] Dish not found" }
    if (dish.restaurant.vendorId !== vendorId) return { ok: false, error: "[App] You can't do that" }

    await this.dishRepo.save([{ id: input.dishId, ...input, updatedBy: vendorId }])
    return { ok: true }
  }

  async updateDishByAdmin(adminId: UserRecord["uid"], input: UpdateDishInput): Promise<UpdateDishOutput> {
    const { dishId } = input
    const existing = await this.dishRepo.findOneBy({
      id: dishId,
    })

    if (!existing) return { ok: false, error: "[App] Dish not found" }

    const dish = Object.assign(existing, input)
    dish.updatedBy = adminId

    await this.dishRepo.save(dish)
    return { ok: true }
  }

  async deleteDishByVendor(vendorId: UserRecord["uid"], { dishId }: DeleteDishArgs): Promise<DeleteCategoryOutput> {
    const existing = await this.dishRepo.findOne({
      where: { id: dishId },
      relations: ["restaurant"],
    })

    if (!existing) return { ok: false, error: "[App] Dish not found" }
    if (existing.restaurant.vendorId !== vendorId) return { ok: false, error: "[App] You can't do that" }

    existing.deletedBy = vendorId
    const saved = await this.dishRepo.save(existing)
    await this.dishRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async deleteDishByAdmin(adminId: UserRecord["uid"], { dishId }: DeleteDishArgs): Promise<DeleteCategoryOutput> {
    const existing = await this.dishRepo.findOne({
      where: { id: dishId },
      relations: ["restaurant"],
    })

    if (!existing) return { ok: false, error: "[App] Dish not found" }

    existing.deletedBy = adminId
    const saved = await this.dishRepo.save(existing)
    await this.dishRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async getRestaurantsByAdmin(args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    const {
      searchQuery,
      pageOptions: { skip, take },
    } = args
    const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

    if (searchQuery)
      queryBuilder.andWhere(
        `
            restaurant.name ILIKE :searchQuery
            OR
            restaurant.address ILIKE :searchQuery
          `,
        { searchQuery },
      )

    const matchedCount = await queryBuilder.getCount()

    queryBuilder
      .skip(skip)
      .take(take)
      .leftJoinAndSelect("restaurant.categories", "category")
      .leftJoinAndSelect("restaurant.vendors", "vendor")
      .leftJoinAndSelect("restaurant.categories", "categories")
      .leftJoinAndSelect("restaurant.orders", "orders")
      .leftJoinAndSelect("restaurant.menu", "menu")
      .orderBy("restaurant.isPromoted", "DESC")
      .addOrderBy("restaurant.name", "ASC")

    const restaurants = await queryBuilder.getMany()
    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return {
      restaurants,
      ...paginatedOutput,
    }
  }

  async getRestaurantsByVendor(vendorId: UserRecord["uid"], args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    const {
      searchQuery,
      pageOptions: { skip, take },
    } = args

    const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

    queryBuilder.where(`restaurant.vendorId = :vendorId`, { vendorId })

    if (searchQuery)
      queryBuilder.andWhere(
        `restaurant.name ILIKE :searchQuery
                 OR
                 restaurant.address ILIKE :searchQuery`,
        { searchQuery },
      )

    const matchedCount = await queryBuilder.getCount()

    queryBuilder
      .skip(skip)
      .take(take)
      .leftJoinAndSelect("restaurant.categories", "category")
      .leftJoinAndSelect("restaurant.vendors", "vendor")
      .leftJoinAndSelect("restaurant.orders", "orders")
      .leftJoinAndSelect("restaurant.menu", "menu")
      .orderBy("restaurant.isPromoted", "DESC")
      .addOrderBy("restaurant.name", "ASC")

    const restaurants = await queryBuilder.getMany()
    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return {
      restaurants,
      ...paginatedOutput,
    }
  }

  async getRestaurantsByPublic(args: PaginationRestaurantsArgs): Promise<PaginatedRestaurantsOutput> {
    const {
      pageOptions: { take, skip },
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
      .leftJoinAndSelect("restaurant.categories", "category")
      .leftJoinAndSelect("restaurant.vendors", "vendor")
      .leftJoinAndSelect("restaurant.orders", "orders")
      .leftJoinAndSelect("restaurant.menu", "menu")
      .orderBy("restaurant.isPromoted", "DESC")
      .addOrderBy("restaurant.name", "ASC")

    const restaurants = await queryBuilder.getMany()
    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return {
      restaurants,
      ...paginatedOutput,
    }
  }

  async findRestaurantByIdAndVendorId(vendorId: UserRecord["uid"], restaurantId: Restaurant["id"]): Promise<MyRestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOne({
      where: {
        id: restaurantId,
        vendorId: Equal(vendorId),
      },
      relations: ["menu", "orders"],
    })

    return { ok: true, restaurant }
  }

  async deleteCategoryByAdmin(adminId: UserRecord["uid"], { categoryId }: DeleteCategoryArgs): Promise<DeleteCategoryOutput> {
    const existing = await this.categoryRepo.findOneBy({ id: categoryId })
    if (!existing) return { ok: false, error: "[App] Category not found" }
    existing.deletedBy = adminId
    const saved = await this.categoryRepo.save(existing)
    await this.categoryRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async updateCategoryByAdmin(adminId: UserRecord["uid"], input: AdminUpdateCategoryInput): Promise<AdminUpdateCategoryOutput> {
    const { categoryId, ...updatePayload } = input
    const existing = await this.categoryRepo.findOneBy({ id: categoryId })
    if (!existing) return { ok: false, error: "[App] Category not found" }

    const category = Object.assign(existing, updatePayload)
    category.updatedBy = adminId
    const saved = await this.categoryRepo.save(category)
    return { ok: true }
  }
}
