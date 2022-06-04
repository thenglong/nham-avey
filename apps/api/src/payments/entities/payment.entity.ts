import { Field, InputType, Int, ObjectType } from "@nestjs/graphql"
import { CoreEntity } from "common/entities/core.entity"
import { Restaurant } from "restaurants/entities/restaurant.entity"
import { Column, Entity, ManyToOne, RelationId } from "typeorm"
import { User } from "users/entities/user.entity"

@InputType("PaymentInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field(() => String)
  @Column()
  transactionId: string

  @Field(() => User)
  @ManyToOne(() => User, user => user.payments)
  user: User

  @RelationId((payment: Payment) => payment.user)
  userId: number

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant)
  restaurant: Restaurant

  @Field(() => Int)
  @RelationId((payment: Payment) => payment.restaurant)
  restaurantId: number
}
