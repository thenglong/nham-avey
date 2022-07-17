import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order } from "src/orders/entities/order.entity"
import { Payment } from "src/payments/entities/payment.entity"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

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
      entities: [User, Restaurant, Category, Dish, Order, OrderItem, Payment],
      migrations: [],
      migrationsTableName: "typeorm_migrations",
      namingStrategy: new SnakeNamingStrategy(),
      logger: "advanced-console",
      logging: this.config.get<boolean>("db.logging"),
      synchronize: false,
      keepConnectionAlive: !this.config.get("isProd"),
      ...(this.config.get("db.isHeroku") && {
        ssl: {
          rejectUnauthorized: false, // this should be true outside heroku!
        },
      }),
    }
  }
}
