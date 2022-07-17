import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString, Length } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Order } from "src/orders/entities/order.entity"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm"

@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity()
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

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, category => category.restaurants, {
    nullable: true,
    onDelete: "SET NULL",
  })
  category: Category

  @Field(() => User)
  @ManyToOne(() => User, user => user.restaurants, {
    onDelete: "CASCADE",
    nullable: false,
  })
  owner: User

  @RelationId((restaurant: Restaurant) => restaurant.owner)
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
