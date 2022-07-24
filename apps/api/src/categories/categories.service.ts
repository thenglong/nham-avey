import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRecord } from "firebase-admin/auth"
import slugify from "slugify"
import { Category } from "src/categories/category.entity"
import { CategoryRequest } from "src/categories/category.interface"
import {
  AdminCreateCategoryInput,
  AdminCreateCategoryOutput,
  AdminUpdateCategoryInput,
  AdminUpdateCategoryOutput,
  AllCategoriesOutput,
  PaginationCategoriesOutput,
} from "src/categories/dtos"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { PaginatedRestaurantsOutput } from "src/restaurants/dtos"
import { Repository } from "typeorm"

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  getCategoryBySlug(slug: string) {
    return this.categoryRepo.findOne({ where: { slug } })
  }

  async getOrCreateCategory(request: CategoryRequest): Promise<Category> {
    const { name, coverImageUrl, iconUrl } = request
    const slug = slugify(name, { lower: true })
    let category = await this.categoryRepo.findOneBy({ slug })
    if (!category) {
      const entity = this.categoryRepo.create({ name, slug, coverImageUrl, iconUrl })
      category = await this.categoryRepo.save(entity)
    }
    return category
  }

  async getOrCreateCategories(requests: CategoryRequest[]): Promise<Category[]> {
    return Promise.all<Category>(requests.map(async request => this.getOrCreateCategory(request)))
  }

  async countRestaurantsByCategory(category: Category): Promise<number> {
    const entity = await this.categoryRepo //
      .createQueryBuilder("category")
      .where("category.id = :id", { id: category.id })
      .loadRelationCountAndMap("category.restaurantCount", "category.restaurants", "restaurant")
      .getOne()
    return entity?.restaurantCount as number
  }

  async findAllCategories(): Promise<AllCategoriesOutput> {
    const categories = await this.categoryRepo.find({ order: { name: "ASC" } })
    return { ok: true, categories }
  }

  async findCategories(args: PaginationWithSearchArgs): Promise<PaginationCategoriesOutput> {
    const {
      pageOptions: { take, skip },
      searchQuery,
    } = args

    const queryBuilder = this.categoryRepo.createQueryBuilder("category")
    if (searchQuery) queryBuilder.where(`category.name ILIKE :searchQuery`, { searchQuery })

    const matchedCount = await queryBuilder.getCount()
    const categories = await queryBuilder
      .orderBy("category.name", "ASC")
      .skip(skip)
      .take(take) //
      .getMany() //

    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return { ...paginatedOutput, categories }
  }

  async deleteCategoryByAdmin(adminId: UserRecord["uid"], categoryId: number): Promise<CoreOutput> {
    const existing = await this.categoryRepo.findOneBy({ id: categoryId })
    if (!existing) return { ok: false, error: "[App] Category not found" }
    existing.deletedBy = adminId
    const saved = await this.categoryRepo.save(existing)
    await this.categoryRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async createCategoryByAdmin(adminId: UserRecord["uid"], input: AdminCreateCategoryInput): Promise<AdminCreateCategoryOutput> {
    const [category] = await this.getOrCreateCategories([input])
    category.updatedBy = adminId

    // TODO: Make it just one insert query
    const saved = await this.categoryRepo.save(category)
    return { ok: true, category: saved }
  }

  async updateCategoryByAdmin(adminId: UserRecord["uid"], input: AdminUpdateCategoryInput): Promise<AdminUpdateCategoryOutput> {
    const { categoryId, ...updatePayload } = input
    const existing = await this.categoryRepo.findOneBy({ id: categoryId })
    if (!existing) return { ok: false, error: "[App] Category not found" }

    const slug = slugify(updatePayload.name || existing.name, { lower: true })
    const category = Object.assign(existing, updatePayload)
    category.updatedBy = adminId
    category.slug = slug
    const saved = await this.categoryRepo.save(category)
    return { ok: true, category: saved }
  }
}
