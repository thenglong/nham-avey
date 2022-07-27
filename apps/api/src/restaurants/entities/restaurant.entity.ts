import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsOptional, IsString } from "class-validator"
import { Category } from "src/categories/category.entity"
import { City } from "src/cities/city.entity"
import { CoreEntity } from "src/common/entities/core.entity"
import { Dish } from "src/dishes/dish.entity"
import { Location } from "src/locations/location.entity"
import { Order } from "src/orders/entities/order.entity"
import { OpeningHours } from "src/restaurants/entities/opening-hours.entity"
import { Review } from "src/restaurants/entities/review.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, RelationId } from "typeorm"

/**
 * @todo add additional info like this
 *   // "additionalInfo": {
 *   //   "Service options": [
 *   //     {
 *   //       "Dine-in": true
 *   //     }
 *   //   ],
 *   //   "Amenities": [
 *   //     {
 *   //       "Good for kids": true
 *   //     }
 *   //   ]
 *   // },
 */
@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "restaurants" })
export class Restaurant extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  name: string

  @Field(type => String)
  @Column({ nullable: false })
  @IsString()
  slug: string

  @Field(type => String, { nullable: true })
  @Column({ nullable: true, type: "varchar", length: 255 })
  @IsString()
  description: string

  @Field(() => [String], { nullable: true })
  @Column("varchar", { array: true, nullable: true })
  @IsString({ each: true })
  coverImageUrls: string[]

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  logoImageUrl?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  neighborhood?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  street?: string

  @Field(() => City, { nullable: true })
  @ManyToOne(() => City, city => city.restaurants, { nullable: true })
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city?: City

  @RelationId((restaurant: Restaurant) => restaurant.city)
  cityId?: number

  @Field(() => Review, { nullable: true })
  @OneToMany(() => Review, review => review.restaurant, { nullable: true })
  reviews?: Review[]

  @RelationId((restaurant: Restaurant) => restaurant.reviews)
  reviewsIds?: number[]

  @Field(() => Location, { nullable: true })
  @OneToOne(() => Location, { nullable: true })
  @JoinColumn({ name: "location_id", referencedColumnName: "id" })
  location?: Location

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  website?: string

  @Field(() => OpeningHours, { nullable: true })
  @OneToOne(() => OpeningHours, { nullable: true })
  @JoinColumn({ name: "opening_hours_id", referencedColumnName: "id" })
  openingHours?: OpeningHours

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
  vendorIds?: string[]

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
