import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRecord } from "firebase-admin/auth"
import slugify from "slugify"
import { City } from "src/cities/city.entity"
import { CityRequest } from "src/cities/city.interface"
import {
  PaginationCitiesOutput,
  AdminCreateCityOutput,
  AdminCreateCityInput,
  AdminUpdateCityOutput,
  AllCitiesOutput,
  AdminUpdateCityInput,
} from "src/cities/dtos"
import { CoreOutput } from "src/common/dtos/output.dto"
import { PaginationWithSearchArgs } from "src/common/dtos/pagination.dto"
import { PaginatedRestaurantsOutput } from "src/restaurants/dtos"
import { Repository } from "typeorm"

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  getCityBySlug(slug: string) {
    return this.cityRepo.findOne({ where: { slug } })
  }

  async getOrCreateCity(request: CityRequest): Promise<City> {
    const { name, nameInKhmer } = request
    const slug = slugify(name, { lower: true })
    let city = await this.cityRepo.findOneBy({ slug })
    if (!city) {
      const entity = this.cityRepo.create({ name, slug, nameInKhmer })
      city = await this.cityRepo.save(entity)
    }
    return city
  }

  async getOrCreateCities(requests: CityRequest[]): Promise<City[]> {
    return Promise.all<City>(requests.map(async request => this.getOrCreateCity(request)))
  }

  async countRestaurantsByCity(city: City): Promise<number> {
    const entity = await this.cityRepo //
      .createQueryBuilder("city")
      .where("city.id = :id", { id: city.id })
      .loadRelationCountAndMap("city.restaurantCount", "city.restaurants", "restaurant")
      .getOne()
    return entity?.restaurantCount as number
  }

  async findAllCities(): Promise<AllCitiesOutput> {
    const cities = await this.cityRepo.find({
      order: { name: "ASC" },
      relations: { location: true },
    })
    return { ok: true, cities }
  }

  async findCities(args: PaginationWithSearchArgs): Promise<PaginationCitiesOutput> {
    const {
      pageOptions: { take, skip },
      searchQuery,
    } = args

    const queryBuilder = this.cityRepo.createQueryBuilder("city")
    if (searchQuery)
      queryBuilder
        .where(
          `
            city.name ILIKE :searchQuery
            OR
            city.nameInKhmer ILIKE :searchQuery
    `,
          { searchQuery },
        )
        .leftJoinAndSelect("city.location", "location")

    const matchedCount = await queryBuilder.getCount()
    const cities = await queryBuilder
      .orderBy("city.name", "ASC")
      .skip(skip)
      .take(take) //
      .getMany() //

    const paginatedOutput = new PaginatedRestaurantsOutput(args, matchedCount)
    return { ...paginatedOutput, cities }
  }

  async deleteCityByAdmin(adminId: UserRecord["uid"], cityId: number): Promise<CoreOutput> {
    const existing = await this.cityRepo.findOneBy({ id: cityId })
    if (!existing) return { ok: false, error: "[App] City not found" }
    existing.deletedBy = adminId
    const saved = await this.cityRepo.save(existing)
    await this.cityRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async createCityByAdmin(adminId: UserRecord["uid"], input: AdminCreateCityInput): Promise<AdminCreateCityOutput> {
    const [city] = await this.getOrCreateCities([input])
    city.updatedBy = adminId

    // TODO: Make it just one insert query
    const saved = await this.cityRepo.save(city)
    return { ok: true, city: saved }
  }

  async updateCityByAdmin(adminId: UserRecord["uid"], input: AdminUpdateCityInput): Promise<AdminUpdateCityOutput> {
    const { cityId, ...updatePayload } = input
    const existing = await this.cityRepo.findOneBy({ id: cityId })
    if (!existing) return { ok: false, error: "[App] City not found" }

    const slug = slugify(updatePayload.name || existing.name, { lower: true })
    const city = Object.assign(existing, updatePayload)
    city.updatedBy = adminId
    city.slug = slug
    const saved = await this.cityRepo.save(city)
    return { ok: true, city: saved }
  }
}
