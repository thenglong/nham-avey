import { Injectable } from "@nestjs/common"
import { Interval } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { Payment } from "src/payments/payment.entity"
import { CreatePaymentInput, CreatePaymentOutput, GetPaymentsOutput } from "src/payments/payments.dto"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"
import { Equal, LessThan, Repository } from "typeorm"

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly userService: UserService,
  ) {}

  async createPayment(vendorId: string, { transactionId, restaurantId }: CreatePaymentInput): Promise<CreatePaymentOutput> {
    const restaurant = await this.restaurants.findOneBy({ id: restaurantId })
    if (!restaurant) return { ok: false, error: "[App] Restaurant not found" }
    if (!restaurant.vendorIds?.includes(vendorId)) return { ok: false, error: "[App] You can't do this" }

    const vendorEntity = (await this.userService.findUserById(vendorId)) as User
    if (!vendorEntity) return { ok: false, error: "[App] Vendor deleted" }

    const payment = this.payments.create({
      transactionId,
      user: vendorEntity,
      restaurant,
    })

    await this.payments.save(payment)

    restaurant.isPromoted = true
    const date = new Date()
    date.setDate(date.getDate() + 7)
    restaurant.promotedUntil = date
    await this.restaurants.save(restaurant)

    return { ok: true }
  }

  async getPayments(vendorId: string): Promise<GetPaymentsOutput> {
    const vendor = await this.userService.findUserById(vendorId)
    if (!vendor) return { ok: false, error: "[App] Vendor not found" }

    const payments = await this.payments.findBy({ user: Equal(vendor) })
    return { ok: true, payments }
  }

  @Interval(2000)
  async checkPromotedRestaurants() {
    const restaurants = await this.restaurants.find({
      where: {
        isPromoted: true,
        promotedUntil: LessThan(new Date()),
      },
    })

    await Promise.all(
      restaurants.map(async restaurant => {
        restaurant.isPromoted = false
        restaurant.promotedUntil = null
        await this.restaurants.save(restaurant)
      }),
    )
  }
}
