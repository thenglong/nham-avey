import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dish } from "src/dishes/dish.entity"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order } from "src/orders/entities/order.entity"
import { OrderResolver } from "src/orders/orders.resolver"
import { OrderService } from "src/orders/orders.service"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish]), UsersModule],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
