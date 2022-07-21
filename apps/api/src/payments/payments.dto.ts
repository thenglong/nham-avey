import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Payment } from "src/payments/payment.entity"

@InputType()
export class CreatePaymentInput extends PickType(Payment, ["transactionId", "restaurantId"]) {}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {}

@ObjectType()
export class GetPaymentsOutput extends CoreOutput {
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[]
}
