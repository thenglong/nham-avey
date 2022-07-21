import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order } from "src/orders/entities/order.entity"
import { OrderResolver } from "src/orders/orders.resolver"
import { OrderService } from "src/orders/orders.service"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { UsersModule } from "src/users/users.module"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish, User]), UsersModule],
  providers: [OrderService, OrderResolver, UserService],
})
export class OrdersModule {}
