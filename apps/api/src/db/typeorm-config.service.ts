import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { OrderItem } from "orders/entities/order-item.entity"
import { Order } from "orders/entities/order.entity"
import { Payment } from "payments/entities/payment.entity"
import { Category } from "restaurants/entities/category.entity"
import { Dish } from "restaurants/entities/dish.entity"
import { Restaurant } from "restaurants/entities/restaurant.entity"
import { User } from "users/entities/user.entity"
import { Verification } from "users/entities/verification.entity"

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.config.get<string>("db.host"),
      port: this.config.get<number>("db.port"),
      database: this.config.get<string>("db.name"),
      username: this.config.get<string>("db.username"),
      password: this.config.get<string>("db.password"),
      entities: [
        User,
        Verification,
        Restaurant,
        Category,
        Dish,
        Order,
        OrderItem,
        Payment,
      ],
      migrations: [],
      migrationsTableName: "typeorm_migrations",
      logger: "advanced-console",
      logging: this.config.get<boolean>("db.logging"),
      synchronize: true,
      keepConnectionAlive: !this.config.get("isProd"),
      ...(this.config.get("db.isHeroku") && {
        ssl: {
          rejectUnauthorized: false, // this should be true outside heroku!
        },
      }),
    }
  }
}
