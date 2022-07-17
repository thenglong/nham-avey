import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { GraphqlAuthGuard } from "src/auth/graphql-auth-guard.service"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GraphqlAuthGuard,
    },
  ],
})
export class AuthModule {}
