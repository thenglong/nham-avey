import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql"
import { IsBoolean, IsEmail, IsEnum, IsString, IsOptional } from "class-validator"
import { CoreWithoutIdEntity } from "src/common/entities/core.entity"
import { Order } from "src/orders/entities/order.entity"
import { Payment } from "src/payments/payment.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Vendor = "Vendor",
  Driver = "Driver",
}

registerEnumType(UserRole, { name: "UserRole" })

@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "users" })
export class User extends CoreWithoutIdEntity {
  @PrimaryColumn()
  @Field(() => String)
  id: string

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string

  @Column()
  @Field(type => String)
  @IsEmail()
  email: string

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  @IsOptional()
  photoURL?: string

  @Field(type => [UserRole])
  @IsEnum(UserRole, { each: true })
  @Column({
    enumName: "user_role",
    type: "enum",
    enum: UserRole,
    array: true,
    default: [UserRole.Customer],
  })
  roles: UserRole[]

  @Column({ default: false })
  @Field(type => Boolean)
  @IsBoolean()
  isVerified: boolean

  @Field(type => [Restaurant], { nullable: true })
  @ManyToMany(type => Restaurant, restaurant => restaurant.categories)
  restaurants: Restaurant[] | null

  @Field(type => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.customer)
  orders: Order[] | null

  @Field(type => [Payment], { nullable: true })
  @OneToMany(() => Payment, payment => payment.user, { eager: true })
  payments: Payment[] | null

  @Field(type => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.driver)
  rides: Order[] | null
}
