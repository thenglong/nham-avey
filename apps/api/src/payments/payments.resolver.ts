import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Role } from "src/auth/role.decorator"
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from "src/payments/dtos/create-payment.dto"
import { GetPaymentsOutput } from "src/payments/dtos/get-payments.dto"
import { Payment } from "src/payments/entities/payment.entity"
import { PaymentService } from "src/payments/payments.service"
import { UserRole, User } from "src/users/entities/user.entity"

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOutput)
  @Role(UserRole.Owner)
  createPayment(
    @AuthUser() owner: User,
    @Args("input") createPaymentInput: CreatePaymentInput
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentInput)
  }

  @Query(() => GetPaymentsOutput)
  @Role(UserRole.Owner)
  getPayments(@AuthUser() user: User): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(user)
  }
}
