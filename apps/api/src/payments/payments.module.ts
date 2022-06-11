import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Payment } from "src/payments/entities/payment.entity"
import { PaymentResolver } from "src/payments/payments.resolver"
import { PaymentService } from "src/payments/payments.service"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentsModule {}
