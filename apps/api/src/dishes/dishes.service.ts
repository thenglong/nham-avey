import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRecord } from "firebase-admin/auth"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Dish } from "src/dishes/dish.entity"
import { CreateDishInput, DishOutput, UpdateDishInput } from "src/dishes/dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Repository } from "typeorm"

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepo: Repository<Dish>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async createDishByVendor(vendorId: UserRecord["uid"], input: CreateDishInput): Promise<DishOutput> {
    const restaurant = await this.restaurantRepo.findOneBy({
      id: input.restaurantId,
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    if (!restaurant.vendorIds?.includes(vendorId)) return { ok: false, error: "[App] You can't do that" }

    await this.dishRepo.save(this.dishRepo.create({ ...input, restaurant, createdAt: vendorId }))

    return { ok: true }
  }

  async createDishByAdmin(adminId: UserRecord["uid"], input: CreateDishInput): Promise<DishOutput> {
    const { restaurantId } = input
    const restaurant = await this.restaurantRepo.findOneBy({
      id: restaurantId,
    })

    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    await this.dishRepo.save(this.dishRepo.create({ ...input, restaurant, createdBy: adminId }))
    return { ok: true }
  }

  async updateDishByVendor(vendorId: UserRecord["uid"], input: UpdateDishInput): Promise<DishOutput> {
    const dish = await this.dishRepo.findOne({
      where: { id: input.dishId },
      relations: ["restaurant"],
    })

    if (!dish) return { ok: false, error: "[App] Dish not found" }
    if (!dish.restaurant.vendorIds?.includes(vendorId)) return { ok: false, error: "[App] You can't do that" }

    await this.dishRepo.save([{ id: input.dishId, ...input, updatedBy: vendorId }])
    return { ok: true }
  }

  async updateDishByAdmin(adminId: UserRecord["uid"], input: UpdateDishInput): Promise<DishOutput> {
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

  async deleteDishByVendor(vendorId: UserRecord["uid"], dishId: number): Promise<CoreOutput> {
    const existing = await this.dishRepo.findOne({
      where: { id: dishId },
      relations: {
        restaurant: {
          vendors: true,
        },
      },
    })

    if (!existing) return { ok: false, error: "[App] Dish not found" }
    if (!existing.restaurant.vendorIds?.includes(vendorId)) return { ok: false, error: "[App] You can't do that" }

    existing.deletedBy = vendorId
    const saved = await this.dishRepo.save(existing)
    await this.dishRepo.softDelete({ id: saved.id })
    return { ok: true }
  }

  async deleteDishByAdmin(adminId: UserRecord["uid"], dishId: number): Promise<CoreOutput> {
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
}
