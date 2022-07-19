import { Field, Float, InputType, ObjectType, registerEnumType } from "@nestjs/graphql"
import { IsEnum, IsNumber } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from "typeorm"

export enum OrderStatus {
  Pending = "Pending",
  Cooking = "Cooking",
  Cooked = "Cooked",
  PickedUp = "PickedUp",
  Delivered = "Delivered",
}

registerEnumType(OrderStatus, { name: "OrderStatus" })

@InputType("OrderInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "orders" })
export class Order extends CoreEntity {
  @Field(type => User, { nullable: true })
  @ManyToOne(type => User, user => user.orders, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  customer?: User

  @RelationId((order: Order) => order.customer)
  customerId: string

  @Field(type => User, { nullable: true })
  @ManyToOne(type => User, user => user.rides, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  driver?: User

  @RelationId((order: Order) => order.driver)
  driverId: string

  @Field(type => Restaurant, { nullable: true })
  @ManyToOne(type => Restaurant, restaurant => restaurant.orders, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  restaurant?: Restaurant

  @Field(type => [OrderItem])
  @ManyToMany(type => OrderItem, {
    eager: true,
  })
  @JoinTable({ name: "order_order_items", joinColumn: { name: "order_id" }, inverseJoinColumn: { name: "order_item_id" } })
  items: OrderItem[]

  @Column({ nullable: true })
  @Field(type => Float, { nullable: true })
  @IsNumber()
  total?: number

  @Column({
    type: "enum",
    enumName: "order_status",
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  @Field(type => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus
}
