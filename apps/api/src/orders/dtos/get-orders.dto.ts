import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "common/dtos/output.dto"
import { OrderStatus, Order } from "orders/entities/order.entity"

@InputType()
export class GetOrdersInput {
  @Field(type => OrderStatus, { nullable: true })
  status?: OrderStatus
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field(type => [Order], { nullable: true })
  orders?: Order[]
}
