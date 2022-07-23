import { Field, InputType, Int, ObjectType } from "@nestjs/graphql"
import { IsNumber, IsOptional, IsString } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Location } from "src/locations/location.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm"

@InputType("ReviewInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "reviews" })
export class Review extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  name: string

  @Field(() => User)
  @OneToOne(() => Location, { nullable: false })
  @JoinColumn({ name: "customer_id", referencedColumnName: "id" })
  customer: User

  // TODO: add validation or constraint check min: 1, max:5
  @Field(() => Int)
  @Column({ nullable: false })
  @IsNumber()
  stars: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  text: string

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, restaurant => restaurant.reviews)
  @JoinColumn({ name: "restaurant_id", referencedColumnName: "id" })
  restaurant: Restaurant

  @RelationId((review: Review) => review.restaurant)
  restaurantId: number
}
