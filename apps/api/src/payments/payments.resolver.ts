import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { DecodedIdToken } from "firebase-admin/auth"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { Payment } from "src/payments/payment.entity"
import { CreatePaymentInput, CreatePaymentOutput, GetPaymentsOutput } from "src/payments/payments.dto"
import { PaymentService } from "src/payments/payments.service"
import { UserRole } from "src/users/entities/user.entity"

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Roles(UserRole.Vendor)
  createPayment(
    @GraphqlAuthUser() decodedIdToken: DecodedIdToken,
    @Args("input") createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(decodedIdToken.uid, createPaymentInput)
  }

  @Query(() => GetPaymentsOutput)
  @Roles(UserRole.Vendor)
  getPayments(@GraphqlAuthUser() decodedIdToken: DecodedIdToken): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(decodedIdToken.uid)
  }
}
