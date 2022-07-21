import { Field, InputType, Int, ObjectType } from "@nestjs/graphql"
import { CoreEntity } from "src/common/entities/core.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, ManyToOne, RelationId } from "typeorm"

@InputType("PaymentInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "payments" })
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
