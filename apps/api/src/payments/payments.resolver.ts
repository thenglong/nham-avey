import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GraphqlAuthUser } from "src/auth/graphql-auth-user.decorator"
import { Roles } from "src/auth/role.decorator"
import { CreatePaymentInput, CreatePaymentOutput } from "src/payments/dtos/create-payment.dto"
import { GetPaymentsOutput } from "src/payments/dtos/get-payments.dto"
import { Payment } from "src/payments/entities/payment.entity"
import { PaymentService } from "src/payments/payments.service"
import { UserRole, User } from "src/users/entities/user.entity"

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Roles(UserRole.Vendor)
  createPayment(@GraphqlAuthUser() owner: User, @Args("input") createPaymentInput: CreatePaymentInput): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentInput)
  }

  @Query(() => GetPaymentsOutput)
  @Roles(UserRole.Vendor)
  getPayments(@GraphqlAuthUser() user: User): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(user)
  }
}
