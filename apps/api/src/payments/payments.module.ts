import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Payment } from "src/payments/payment.entity"
import { PaymentResolver } from "src/payments/payments.resolver"
import { PaymentService } from "src/payments/payments.service"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { UsersModule } from "src/users/users.module"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant, User]), UsersModule],
  providers: [PaymentService, PaymentResolver, UserService],
})
export class PaymentsModule {}
