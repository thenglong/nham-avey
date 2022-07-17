import { Injectable } from "@nestjs/common"
import { Interval } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { CreatePaymentInput, CreatePaymentOutput } from "src/payments/dtos/create-payment.dto"
import { GetPaymentsOutput } from "src/payments/dtos/get-payments.dto"
import { Payment } from "src/payments/entities/payment.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { Equal, LessThan, Repository } from "typeorm"

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async createPayment(vendor: User, { transactionId, restaurantId }: CreatePaymentInput): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOneBy({ id: restaurantId })

      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      if (restaurant.vendorId !== vendor.id) {
        return {
          ok: false,
          error: "[App] You can't do this",
        }
      }

      await this.payments.save(
        this.payments.create({
          transactionId,
          user: vendor,
          restaurant,
        }),
      )

      restaurant.isPromoted = true
      const date = new Date()
      date.setDate(date.getDate() + 7)
      restaurant.promotedUntil = date

      this.restaurants.save(restaurant)

      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not create payment",
      }
    }
  }

  async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.findBy({ user: Equal(user) })
      return {
        ok: true,
        payments,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not load payments",
      }
    }
  }

  @Interval(2000)
  async checkPromotedRestaurants() {
    const restaurants = await this.restaurants.find({
      where: {
        isPromoted: true,
        promotedUntil: LessThan(new Date()),
      },
    })

    restaurants.forEach(async restaurant => {
      restaurant.isPromoted = false
      restaurant.promotedUntil = null
      await this.restaurants.save(restaurant)
    })
  }
}
