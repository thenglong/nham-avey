import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { parse } from "pg-connection-string"
import { Category } from "src/categories/category.entity"
import { City } from "src/cities/city.entity"
import { Dish } from "src/dishes/dish.entity"
import { Image } from "src/images/entities/image.entity"
import { Location } from "src/locations/location.entity"
import { OrderItem } from "src/orders/entities/order-item.entity"
import { Order } from "src/orders/entities/order.entity"
import { Payment } from "src/payments/payment.entity"
import { OpeningHours } from "src/restaurants/entities/opening-hours.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Review } from "src/restaurants/entities/review.entity"
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
      entities: [User, Restaurant, Category, Dish, Order, OrderItem, Payment, City, Location, OpeningHours, Review, Image],
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
