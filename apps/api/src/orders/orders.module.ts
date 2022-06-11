import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order } from "src/orders/entities/order.entity"
import { OrderResolver } from "src/orders/orders.resolver"
import { OrderService } from "src/orders/orders.service"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish])],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
