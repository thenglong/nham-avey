import { ArgsType, Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql"
import { OmitType } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsEnum } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Order } from "src/orders/entities/order.entity"
import { Payment } from "src/payments/entities/payment.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Vendor = "Vendor",
  Driver = "Driver",
}

registerEnumType(UserRole, { name: "UserRole" })

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User extends OmitType(CoreEntity, ["id"] as const) {
  @PrimaryColumn()
  @Field(() => String)
  id: string

  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string

  @Column({
    type: "enum",
    enum: UserRole,
  })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole

  @Column({ default: false })
  @Field(type => Boolean)
  @IsBoolean()
  verified: boolean

  @Field(type => [Restaurant])
  @OneToMany(() => Restaurant, restaurant => restaurant.owner)
  restaurants: Restaurant[]

  @Field(type => [Order])
  @OneToMany(() => Order, order => order.customer)
  orders: Order[]

  @Field(type => [Payment])
  @OneToMany(() => Payment, payment => payment.user, { eager: true })
  payments: Payment[]

  @Field(type => [Order])
  @OneToMany(() => Order, order => order.driver)
  rides: Order[]
}
