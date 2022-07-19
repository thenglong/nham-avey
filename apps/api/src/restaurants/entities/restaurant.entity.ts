import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString, Length } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Order } from "src/orders/entities/order.entity"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from "typeorm"

@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "restaurants" })
export class Restaurant extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(4)
  name: string

  @Field(() => String)
  @Column()
  @IsString()
  coverImg: string

  @Field(() => String)
  @Column()
  @IsString()
  address: string

  // TODO: upgrade to m -> m
  @Field(() => [Category], { nullable: true })
  @ManyToMany(type => Category, { nullable: true, onDelete: "SET NULL" })
  @JoinTable({ name: "restaurant_categories", joinColumn: { name: "restaurant_id" }, inverseJoinColumn: { name: "category_id" } })
  categories: Category[]

  // TODO: upgrade to m -> m
  @Field(() => User)
  @ManyToOne(() => User, user => user.restaurants, {
    onDelete: "CASCADE",
    nullable: false,
  })
  vendor: User

  @RelationId((restaurant: Restaurant) => restaurant.vendor)
  vendorId: string

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.restaurant)
  orders: Order[]

  @Field(() => [Dish], { nullable: true })
  @OneToMany(() => Dish, dish => dish.restaurant)
  menu: Dish[]

  @Field(() => Boolean)
  @Column({ default: false })
  isPromoted: boolean

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: "timestamptz" })
  promotedUntil: Date | null
}
