import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql"
import { IsBoolean, IsEmail, IsEnum } from "class-validator"
import { CoreWithoutIdEntity } from "src/common/entities/core.entity"
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
export class User extends CoreWithoutIdEntity {
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
  @Field(type => [UserRole])
  @IsEnum(UserRole, { each: true })
  @Column({
    name: "roles",
    enumName: "user_roles_enum",
    type: "enum",
    enum: UserRole,
    array: true,
    default: [UserRole.Customer],
  })
  roles: UserRole[]

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
