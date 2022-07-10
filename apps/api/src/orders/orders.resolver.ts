import { Inject } from "@nestjs/common"
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql"
import { PubSub } from "graphql-subscriptions"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import {
  NEW_COOKED_ORDER,
  NEW_ORDER_UPDATE,
  NEW_PENDING_ORDER,
  PUB_SUB,
} from "src/common/common.constants"
import { CreateOrderInput, CreateOrderOutput } from "src/orders/dtos/create-order.dto"
import { EditOrderInput, EditOrderOutput } from "src/orders/dtos/edit-order.dto"
import { GetOrderInput, GetOrderOutput } from "src/orders/dtos/get-order.dto"
import { GetOrdersInput, GetOrdersOutput } from "src/orders/dtos/get-orders.dto"
import { OrderUpdatesInput } from "src/orders/dtos/order-updates.dto"
import { TakeOrderInput, TakeOrderOutput } from "src/orders/dtos/take-order.dto"
import { Order } from "src/orders/entities/order.entity"
import { OrderService } from "src/orders/orders.service"
import { UserRole, User } from "src/users/entities/user.entity"

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly ordersService: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) {}

  @Mutation(() => CreateOrderOutput)
  @Roles(UserRole.Customer)
  async createOrder(
    @AuthUser() customer: User,
    @Args("input") createOrderInput: CreateOrderInput
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(customer, createOrderInput)
  }

  @Query(() => GetOrdersOutput)
  async getOrders(
    @AuthUser() user: User,
    @Args("input") getOrdersInput: GetOrdersInput
  ): Promise<GetOrdersOutput> {
    return this.ordersService.getOrders(user, getOrdersInput)
  }

  @Query(() => GetOrderOutput)
  async getOrder(
    @AuthUser() user: User,
    @Args("input") getOrderInput: GetOrderInput
  ): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(user, getOrderInput)
  }

  @Mutation(() => EditOrderOutput)
  async editOrder(
    @AuthUser() user: User,
    @Args("input") editOrderInput: EditOrderInput
  ): Promise<EditOrderOutput> {
    return this.ordersService.editOrder(user, editOrderInput)
  }

  @Subscription(() => Order, {
    filter: ({ pendingOrders: { ownerId } }, _, { user }) => {
      return ownerId === user.id
    },
    resolve: ({ pendingOrders: { order } }) => {
      return order
    },
  })
  @Roles(UserRole.Vendor)
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER)
  }

  @Subscription(() => Order)
  @Roles(UserRole.Driver)
  cookedOrders() {
    return this.pubSub.asyncIterator(NEW_COOKED_ORDER)
  }

  @Subscription(() => Order, {
    filter: (
      { orderUpdates: order }: { orderUpdates: Order },
      { input }: { input: OrderUpdatesInput },
      { user }: { user: User }
    ) => {
      if (
        order.driverId !== user.id &&
        order.customerId !== user.id &&
        order.restaurant?.ownerId !== user.id
      ) {
        return false
      }
      return order.id === input.id
    },
  })
  orderUpdates(@Args("input") _orderUpdatesInput: OrderUpdatesInput) {
    return this.pubSub.asyncIterator(NEW_ORDER_UPDATE)
  }

  @Mutation(() => TakeOrderOutput)
  @Roles(UserRole.Driver)
  takeOrder(
    @AuthUser() driver: User,
    @Args("input") takeOrderInput: TakeOrderInput
  ): Promise<TakeOrderOutput> {
    return this.ordersService.takeOrder(driver, takeOrderInput)
  }
}
