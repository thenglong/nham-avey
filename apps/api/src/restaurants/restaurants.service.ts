import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DecodedIdToken, UserRecord } from "firebase-admin/auth"
import slugify from "slugify"
import { CategoryService } from "src/categories/categories.service"
import { CategoryRequest } from "src/categories/category.interface"
import { CityService } from "src/cities/cities.service"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import {
  AdminCreateRestaurantInput,
  AdminUpdateRestaurantInput,
  PaginatedCategoryRestaurantsOutput,
  PaginatedCityRestaurantsOutput,
  PaginatedRestaurantsOutput,
  PaginationCategoryRestaurantsArgs,
  PaginationCityRestaurantsArgs,
  RestaurantOutput,
  VendorCreateRestaurantInput,
  VendorUpdateRestaurantInput,
} from "src/restaurants/dtos"
import { AllRestaurantsSlugArgs, AllRestaurantsSlugOutput } from "src/restaurants/dtos/all-restaurants-slug.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { UserRole } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"
import { Any, Repository } from "typeorm"

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
  ) {}

  async findAllRestaurantsSlug(args: AllRestaurantsSlugArgs): Promise<AllRestaurantsSlugOutput> {
    const { take } = args
    const queryBuilder = this.restaurantRepo //
      .createQueryBuilder("restaurant")
      .select("restaurant.slug", "slug")

    const allCount = await queryBuilder.getCount()
    if (take) {
      queryBuilder.take(take)
    }

    const restaurants = await queryBuilder.getRawMany()
    return {
      ok: true,
      slugs: restaurants.map(restaurant => restaurant.slug),
      allCount,
    }
  }

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

  async findRestaurantsByCitySlug(args: PaginationCityRestaurantsArgs): Promise<PaginatedCityRestaurantsOutput> {
    const {
      pageOptions: { take, skip },
      slug,
    } = args
    const city = await this.cityService.getCityBySlug(slug)
    if (!city) return { ok: false, error: "[App] City not found" }

    const queryBuilder = await this.restaurantRepo
      .createQueryBuilder("restaurant")
      .leftJoinAndSelect("restaurant.city", "city")
      .where(`city.id = :cityId`, { cityId: city.id })
      .leftJoinAndSelect("restaurant.vendors", "vendor")

    const matchedCount = await queryBuilder.getCount()
    const restaurants = await queryBuilder //
      .orderBy("restaurant.isPromoted", "DESC")
      .take(take)
      .skip(skip)
      .getMany()

    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return {
      city,
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
    return { ok: true, data: restaurant }
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

    return { ok: true, data: saved }
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

  async findRestaurantById(id: Restaurant["id"]): Promise<RestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({ id })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    return { ok: true, data: restaurant }
  }

  async findRestaurantBySlug(slug: Restaurant["slug"]): Promise<RestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({ slug })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    return { ok: true, data: restaurant }
  }

  async findRestaurantsByAdmin(args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
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
      data: restaurants,
      ...paginatedOutput,
    }
  }

  async findRestaurantsByVendor(vendorId: UserRecord["uid"], args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
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
      data: restaurants,
      ...paginatedOutput,
    }
  }

  async findRestaurants(args: PaginationWithSearchArgs): Promise<PaginatedRestaurantsOutput> {
    const {
      pageOptions: { take, skip },
      searchQuery,
    } = args
    const queryBuilder = this.restaurantRepo.createQueryBuilder("restaurant")

    if (searchQuery) {
      queryBuilder.where(
        `
                  restaurant.name ILIKE :searchQuery
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
      data: restaurants,
      ...paginatedOutput,
    }
  }

  async findRestaurantByIdAndVendorId(vendorId: UserRecord["uid"], restaurantId: Restaurant["id"]): Promise<RestaurantOutput> {
    const restaurant = await this.restaurantRepo.findOne({
      where: {
        id: restaurantId,
        vendorIds: Any([vendorId]),
      },
      relations: ["menu", "orders"],
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }

    return { ok: true, data: restaurant }
  }
}
