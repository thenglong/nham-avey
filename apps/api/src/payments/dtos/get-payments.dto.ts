import { Field, ObjectType } from "@nestjs/graphql"
import { CoreOutput } from "common/dtos/output.dto"
import { Payment } from "payments/entities/payment.entity"

@ObjectType()
export class GetPaymentsOutput extends CoreOutput {
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[]
}
