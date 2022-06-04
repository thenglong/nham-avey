import { join } from "path"

import { ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ScheduleModule } from "@nestjs/schedule"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { AuthModule } from "auth/auth.module"
import { CommonModule } from "common/common.module"
import configuration from "config/configuration"
import { TypeormConfigService } from "db/typeorm-config.service"
import * as Joi from "joi"
import { JwtModule } from "jwt/jwt.module"
import { MailModule } from "mail/mail.module"
import { OrdersModule } from "orders/orders.module"
import { PaymentsModule } from "payments/payments.module"
import { RestaurantsModule } from "restaurants/restaurants.module"
import { UploadsModule } from "uploads/uploads.module"
import { UsersModule } from "users/users.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        // PRIVATE_KEY: Joi.string().required(),
        // MAILGUN_API_KEY: Joi.string().required(),
        // MAILGUN_DOMAIN_NAME: Joi.string().required(),
        // MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), "apps/api/src/schema.gql"),
      // context: ({ req, connection }) => {
      //   const TOKEN_KEY = "authorization"
      //   return {
      //     token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
      //   }
      // },
    }),
    ScheduleModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY as string,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY as string,
      domain: process.env.MAILGUN_DOMAIN_NAME as string,
      fromEmail: process.env.MAILGUN_FROM_EMAIL as string,
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    CommonModule,
    PaymentsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
