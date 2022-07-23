import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DecodedIdToken, UserRecord } from "firebase-admin/auth"
import slugify from "slugify"
import { Category } from "src/categories/category.entity"
import { CategoryRequest } from "src/categories/category.interface"
import { CategoryService } from "src/categories/category.service"
import { PaginatedCategoryRestaurantsOutput, PaginationCategoryRestaurantsArgs } from "src/categories/dtos"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import {
  AdminCreateRestaurantInput,
  AdminUpdateRestaurantInput,
  PaginatedRestaurantsOutput,
  RestaurantOutput,
  VendorCreateRestaurantInput,
  VendorUpdateRestaurantInput,
} from "src/restaurants/dtos"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"
import { Any, Repository } from "typeorm"

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async findRestaurantsByCategorySlug(args: PaginationCategoryRestaurantsArgs): Promise<PaginatedCategoryRestaurantsOutput> {
    const {
      pageOptions: { take, skip },
      slug,
    } = args
    const category = await this.categoryService.getCategoryBySlug(slug)
    if (!category) return { ok: false, error: "[App] Category not found" }

    const queryBuilder = await this.restaurantRepo
      .createQueryBuilder("restaurant")
      .leftJoinAndSelect("restaurant.categories", "category")
      .leftJoinAndSelect("restaurant.vendors", "vendor")
      .where(`category.id = :categoryId`, { categoryId: category.id })

    const matchedCount = await queryBuilder.getCount()
    const restaurants = await queryBuilder //
      .orderBy("restaurant.isPromoted", "DESC")
      .take(take)
      .skip(skip)
      .getMany()

    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return {
      category,
      restaurants,
      ...paginatedOutput,
    }
  }

  async createRestaurantByVendor(vendorId: UserRecord["uid"], input: VendorCreateRestaurantInput): Promise<RestaurantOutput> {
    const { categories, ...restaurantPayload } = input
    const vendorEntity = await this.userService.findUserById(vendorId)

    if (!vendorEntity) return { ok: false, error: `Vendor with id ${vendorId} not found` }

    const categoryEntities = await this.categoryService.getOrCreateCategories(categories?.map(name => ({ name })) ?? [])
    const slug = slugify(restaurantPayload.name, { lower: true })
    const restaurant = this.restaurantRepo.create({ ...restaurantPayload, slug })
    restaurant.vendors = [vendorEntity]
    restaurant.categories = categoryEntities

    await this.restaurantRepo.save(restaurant)
    return { ok: true, restaurant }
  }

  async createRestaurantByAdmin(admin: DecodedIdToken, input: AdminCreateRestaurantInput): Promise<RestaurantOutput> {
    const { categories, vendorIds, ...restaurantPayload } = input

    const vendorEntities = await this.userService.findUsersByIds(vendorIds)

    if (vendorEntities.length < vendorIds.length) return { ok: false, error: `Cannot Find All Vendors with ids ${vendorIds.join(", ")}` }

    const categoryEntities = await this.categoryService.getOrCreateCategories(categories?.map(name => ({ name })) ?? [])

    const slug = slugify(restaurantPayload.name, { lower: true })
    const restaurant = this.restaurantRepo.create({ ...restaurantPayload, slug })
    restaurant.vendors = vendorEntities
    restaurant.categories = categoryEntities
    const saved = await this.restaurantRepo.save(restaurant)

    return { ok: true, restaurant: saved }
  }

  async updateRestaurantByVendor(vendorId: UserRecord["uid"], input: VendorUpdateRestaurantInput): Promise<RestaurantOutput> {
    const { restaurantId, categories, ...restaurantPayload } = input
    const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    if (!restaurant.vendorIds?.includes(vendorId)) return { ok: false, error: "[App] You can't update a restaurant that you don't own" }

    const categoryRequests: CategoryRequest[] = categories?.map(name => ({ name })) ?? []
    const categoryEntities = await this.categoryService.getOrCreateCategories(categoryRequests)
    await this.restaurantRepo.save({
      id: restaurantId,
      ...restaurantPayload,
      categories: categoryEntities,
    })
    return { ok: true }
  }

  async updateRestaurantByAdmin(input: AdminUpdateRestaurantInput): Promise<RestaurantOutput> {
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

    restaurant.categories = await this.categoryService.getOrCreateCategories(categories?.map(name => ({ name })) ?? [])

    await this.restaurantRepo.save(restaurant)
    return {
      ok: true,
    }
  }

  async deleteRestaurant(decodedIdToken: DecodedIdToken, restaurantId: Restaurant["id"]): Promise<CoreOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({ id: restaurantId })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    if (!decodedIdToken.roles.includes(UserRole.Admin) || !restaurant.vendorIds?.includes(decodedIdToken.uid))
      return { ok: false, error: "[App] You can't delete a restaurant that you don't own" }

    await this.restaurantRepo.delete(restaurantId)
    return { ok: true }
  }

  async getRestaurantById(id: Restaurant["id"]): Promise<RestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({ id })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }

    return { ok: true, restaurant }
  }

  async getRestaurantsByAdmin(args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
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

  async getRestaurantsByVendor(vendorId: UserRecord["uid"], args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
    const {
      searchQuery,
      pageOptions: { skip, take },
    } = args

    const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

    queryBuilder.where(`restaurant.vendorId = :vendorId`, { vendorId })

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

  async getRestaurants(args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
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

  async getRestaurantByIdAndVendorId(vendorId: UserRecord["uid"], restaurantId: Restaurant["id"]): Promise<RestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOne({
      where: {
        id: restaurantId,
        vendorIds: Any([vendorId]),
      },
      relations: ["menu", "orders"],
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }

    return { ok: true, restaurant }
  }
}
