import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { PubSub } from "graphql-subscriptions"
import { NEW_COOKED_ORDER, NEW_ORDER_UPDATE, NEW_PENDING_ORDER, PUB_SUB } from "src/common/common.constants"
import { CreateOrderInput, CreateOrderOutput } from "src/orders/dtos/create-order.dto"
import { EditOrderInput, EditOrderOutput } from "src/orders/dtos/edit-order.dto"
import { GetOrderInput, GetOrderOutput } from "src/orders/dtos/get-order.dto"
import { GetOrdersInput, GetOrdersOutput } from "src/orders/dtos/get-orders.dto"
import { TakeOrderInput, TakeOrderOutput } from "src/orders/dtos/take-order.dto"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order, OrderStatus } from "src/orders/entities/order.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User, UserRole } from "src/users/entities/user.entity"
import { Equal, Repository } from "typeorm"

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createOrder(customer: User, { restaurantId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurants.findOneBy({ id: restaurantId })
      if (!restaurant) {
        return {
          ok: false,
          error: "[App] Restaurant not found",
        }
      }

      let orderFinalPrice = 0
      const orderItems: OrderItem[] = []

      for (const item of items) {
        const dish = await this.dishes.findOneBy({ id: item.dishId })
        if (!dish) {
          return {
            ok: false,
            error: "[App] Dish not found",
          }
        }
        let dishFinalPrice = dish.price

        for (const itemOption of item.options) {
          const dishOption = dish.options?.find(dishOption => dishOption.name === itemOption.name)
          if (dishOption) {
            if (dishOption.extra) {
              dishFinalPrice = dishFinalPrice + dishOption.extra
            } else {
              const dishOptionChoice = dishOption.choices?.find(optionChoice => optionChoice.name === itemOption.choice)
              if (dishOptionChoice) {
                if (dishOptionChoice.extra) {
                  dishFinalPrice = dishFinalPrice + dishOptionChoice.extra
                }
              }
            }
          }
        }

        orderFinalPrice = orderFinalPrice + dishFinalPrice

        const orderItem = await this.orderItems.save(
          this.orderItems.create({
            dish,
            options: item.options,
          }),
        )

        orderItems.push(orderItem)
      }

      const order = await this.orders.save(
        this.orders.create({
          customer,
          restaurant,
          total: orderFinalPrice,
          items: orderItems,
        }),
      )

      await this.pubSub.publish(NEW_PENDING_ORDER, {
        pendingOrders: { order, vendorId: restaurant.vendorId },
      })

      return {
        ok: true,
        orderId: order.id,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not create order",
      }
    }
  }

  async getOrders(user: User, { status }: GetOrdersInput): Promise<GetOrdersOutput> {
    try {
      let orders: Order[] = []

      if (user.roles.includes(UserRole.Customer)) {
        orders = await this.orders.find({
          where: {
            customer: Equal(user),
            ...(status && { status }),
          },
        })
      } else if (user.roles.includes(UserRole.Driver)) {
        orders = await this.orders.find({
          where: {
            driver: Equal(user),
            ...(status && { status }),
          },
        })
      } else if (user.roles.includes(UserRole.Vendor)) {
        const restaurants = await this.restaurants.find({
          where: {
            vendors: Equal(user),
          },
          relations: ["orders"],
        })
        orders = restaurants.map(restaurant => restaurant.orders).flat()

        if (status) {
          orders = orders.filter(order => order.status === status)
        }
      }
      return {
        ok: true,
        orders,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not get orders",
      }
    }
  }

  canSeeOrder(user: User, order: Order): boolean {
    let canSee = true
    if (user.roles.includes(UserRole.Customer) && order.customerId !== user.id) {
      canSee = false
    }

    if (user.roles.includes(UserRole.Driver) && order.driverId !== user.id) {
      canSee = false
    }

    if (user.roles.includes(UserRole.Vendor) && order.restaurant?.vendorId !== user.id) {
      canSee = false
    }
    return canSee
  }

  async getOrder(user: User, { id: orderId }: GetOrderInput): Promise<GetOrderOutput> {
    try {
      const order = await this.orders.findOne({
        where: { id: orderId },
        relations: ["restaurant"],
      })
      if (!order) {
        return {
          ok: false,
          error: "[App] Order not found",
        }
      }

      if (!this.canSeeOrder(user, order)) {
        return {
          ok: false,
          error: "[App] You can't see that",
        }
      }

      return {
        ok: true,
        order,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not find order",
      }
    }
  }

  async editOrder(user: User, { id: orderId, status }: EditOrderInput): Promise<EditOrderOutput> {
    try {
      const order = await this.orders.findOneBy({ id: orderId })

      if (!order) {
        return {
          ok: false,
          error: "[App] Order not found",
        }
      }

      if (!this.canSeeOrder(user, order)) {
        return {
          ok: false,
          error: "[App] You can't see that",
        }
      }

      let canEdit = true

      if (user.roles.includes(UserRole.Customer)) {
        canEdit = false
      }

      if (user.roles.includes(UserRole.Vendor)) {
        if (status !== OrderStatus.Cooking && status !== OrderStatus.Cooked) {
          canEdit = false
        }
      }

      if (user.roles.includes(UserRole.Driver)) {
        if (status !== OrderStatus.PickedUp && status !== OrderStatus.Delivered) {
          canEdit = false
        }
      }

      if (!canEdit) {
        return {
          ok: false,
          error: "[App] You can't do that",
        }
      }

      await this.orders.save({
        id: orderId,
        status,
      })

      const newOrder = { ...order, status }

      if (user.roles.includes(UserRole.Vendor)) {
        if (status === OrderStatus.Cooked) {
          await this.pubSub.publish(NEW_COOKED_ORDER, {
            cookedOrders: newOrder,
          })
        }
      }

      await this.pubSub.publish(NEW_ORDER_UPDATE, { orderUpdates: newOrder })

      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] You can't edit order",
      }
    }
  }

  async takeOrder(driver: User, { id: orderId }: TakeOrderInput): Promise<TakeOrderOutput> {
    try {
      const order = await this.orders.findOneBy({ id: orderId })

      if (!order) {
        return {
          ok: false,
          error: "[App] Order not found",
        }
      }

      if (order.driver) {
        return {
          ok: false,
          error: "[App] This order already has a driver",
        }
      }

      await this.orders.save({
        id: orderId,
        driver,
      })

      await this.pubSub.publish(NEW_ORDER_UPDATE, {
        orderUpdater: { ...order, driver },
      })
      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: "[App] Could not update an order",
      }
    }
  }
}
