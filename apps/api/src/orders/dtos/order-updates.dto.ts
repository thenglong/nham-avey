import { InputType, PickType } from "@nestjs/graphql"
import { Order } from "src/orders/entities/order.entity"

@InputType()
export class OrderUpdatesInput extends PickType(Order, ["id"]) {}
