import { InternalServerErrorException } from "@nestjs/common"
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql"
import * as bcrypt from "bcrypt"
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Order } from "src/orders/entities/order.entity"
import { Payment } from "src/payments/entities/payment.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm"

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
  Delivery = "Delivery",
}

registerEnumType(UserRole, { name: "UserRole" })

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
  })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  verified: boolean

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, restaurant => restaurant.owner)
  restaurants: Restaurant[]

  @Field(() => [Order])
  @OneToMany(() => Order, order => order.customer)
  orders: Order[]

  @Field(() => [Payment])
  @OneToMany(() => Payment, payment => payment.user, { eager: true })
  payments: Payment[]

  @Field(() => [Order])
  @OneToMany(() => Order, order => order.driver)
  rides: Order[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10)
      } catch (error) {
        throw new InternalServerErrorException()
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password)
      return ok
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
