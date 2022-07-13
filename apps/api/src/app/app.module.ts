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
import { ApiKeyMiddleware } from "src/auth/api-key.middleware"
import { AuthMiddleware } from "src/auth/auth.middleware"
import { AuthModule } from "src/auth/auth.module"
import { AUTHORIZATION_HEADER, SWAGGER_PATH } from "src/common/common.constants"
import { CommonModule } from "src/common/common.module"
import configuration from "src/config/configuration"
import { FileUploadsModule } from "src/file-uploads/file-uploads.module"
import { FirebaseAdminModule } from "src/firebase-admin/firebase-admin.module"
import { MailModule } from "src/mail/mail.module"
import { OrdersModule } from "src/orders/orders.module"
import { PaymentsModule } from "src/payments/payments.module"
import { RestaurantsModule } from "src/restaurants/restaurants.module"
import { TypeormConfigService } from "src/typeorm/typeorm-config.service"
import { UsersModule } from "src/users/users.module"
import * as Yup from "yup"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Yup.object().shape({
        DATABASE_HOST: Yup.string().required(),
        DATABASE_NAME: Yup.string().required(),
        DATABASE_PORT: Yup.string().required(),
        DATABASE_USERNAME: Yup.string().required(),
        DATABASE_PASSWORD: Yup.string().required(),
        FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON: Yup.string().required(),
        FIREBASE_STORAGE_BUCKET_URL: Yup.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), "apps/api/src/schema.gql"),
      context: ({ req, connection }: ApolloServer["context"]) => {
        return {
          [AUTHORIZATION_HEADER]: req ? req.headers[AUTHORIZATION_HEADER] : connection.context[AUTHORIZATION_HEADER],
        }
      },
    }),
    ScheduleModule.forRoot(),
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
      .apply(AuthMiddleware)
      .exclude({ path: "graphql", method: RequestMethod.ALL })
      .forRoutes({ path: "*", method: RequestMethod.ALL })
  }
}
