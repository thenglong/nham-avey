import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { parse } from "pg-connection-string"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order } from "src/orders/entities/order.entity"
import { Payment } from "src/payments/payment.entity"
import { Category } from "src/restaurants/entities/category.entity"
import { Dish } from "src/restaurants/entities/dish.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { User } from "src/users/entities/user.entity"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import { LoggerOptions } from "typeorm/logger/LoggerOptions"

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, database, user, password } = parse(this.config.get<string>("db.url") as string)

    return {
      type: "postgres",
      host: host as string,
      port: +(port || 5432) as number,
      database: database as string,
      username: user,
      password,
      entities: [User, Restaurant, Category, Dish, Order, OrderItem, Payment],
      migrations: [],
      migrationsTableName: "migrations",
      namingStrategy: new SnakeNamingStrategy(),
      logger: "advanced-console",
      logging: this.config.get<LoggerOptions>("db.logging"),
      synchronize: false,
      keepConnectionAlive: !this.config.get("isProd"),
      ssl: {
        rejectUnauthorized: false, // this should be true outside heroku!
      },
      cache: {
        duration: 1500, // override default 1000ms
        type: "redis",
        options: {
          url: this.config.get("REDIS_URL"),
        },
      },
    }
  }
}
