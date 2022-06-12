import { join } from "path"

import { ApolloDriver } from "@nestjs/apollo"
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ScheduleModule } from "@nestjs/schedule"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import { cert } from "firebase-admin/app"
import * as Joi from "joi"
import { ApiKeyMiddleware } from "src/auth/api-key.middleware"
import { AuthModule } from "src/auth/auth.module"
import { SWAGGER_PATH } from "src/common/common.constants"
import { CommonModule } from "src/common/common.module"
import configuration from "src/config/configuration"
import { FileUploadsModule } from "src/file-uploads/file-uploads.module"
import { FirebaseAdminModule } from "src/firebase-admin/firebase-admin.module"
import { JwtModule } from "src/jwt/jwt.module"
import { MailModule } from "src/mail/mail.module"
import { OrdersModule } from "src/orders/orders.module"
import { PaymentsModule } from "src/payments/payments.module"
import { RestaurantsModule } from "src/restaurants/restaurants.module"
import { TypeormConfigService } from "src/typeorm/typeorm-config.service"
import { UsersModule } from "src/users/users.module"

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
        JWT_SECRET: Joi.string().required(),
        FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON: Joi.string().required(),
        FIREBASE_STORAGE_BUCKET_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), "apps/api/src/schema.gql"),
      context: ({ req, connection }: ApolloServer["context"]) => {
        const TOKEN_KEY = "authorization"
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        }
      },
    }),
    ScheduleModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.JWT_SECRET as string,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY as string,
      domain: process.env.MAILGUN_DOMAIN_NAME as string,
      fromEmail: process.env.MAILGUN_FROM_EMAIL as string,
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const serviceAccount = configService.get("firebase.serviceAccount")
        const storageBucket = configService.get("firebase.bucketUrl")
        return {
          credential: cert(serviceAccount),
          storageBucket,
        }
      },
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    CommonModule,
    PaymentsModule,
    FileUploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude({ path: SWAGGER_PATH, method: RequestMethod.ALL })
      .exclude({ path: "graphql", method: RequestMethod.ALL }) // TODO: remove this line when include api key from the frontend
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
