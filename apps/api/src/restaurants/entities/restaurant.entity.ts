import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString, Length } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Order } from "src/orders/entities/order.entity"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinTable, ManyToMany, OneToMany, RelationId } from "typeorm"

@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "restaurants" })
export class Restaurant extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @Length(4)
  name: string

  @Field(() => [String], { nullable: true })
  @Column("varchar", { array: true, nullable: true })
  @IsString({ each: true })
  coverImageUrls: string[]

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  logoImageUrl?: string

  @Field(() => String)
  @Column()
  @IsString()
  address: string

  @Field(() => [Category], { nullable: true })
  @ManyToMany(type => Category, category => category.restaurants, { nullable: true, onDelete: "SET NULL" })
  @JoinTable({
    name: "restaurant_categories",
    joinColumn: { name: "restaurant_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
  })
  categories: Category[]

  @Field(() => [User])
  @ManyToMany(type => User, user => user.restaurants, { nullable: false })
  @JoinTable({
    name: "restaurant_vendors",
    joinColumn: { name: "restaurant_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "vendor_id", referencedColumnName: "id" },
  })
  vendors: User[]

  @RelationId((restaurant: Restaurant) => restaurant.vendors)
  vendorId?: string

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
