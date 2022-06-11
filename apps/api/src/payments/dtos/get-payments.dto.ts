import { Field, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "src/common/dtos/output.dto"
import { Payment } from "src/payments/entities/payment.entity"

@ObjectType()
export class GetPaymentsOutput extends CoreOutput {
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[]
}
