import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { AdminResolver } from "src/users/resolvers/admins.resolver"
import { CommonUserResolver } from "src/users/resolvers/common-users.resolver"
import { DriverResolver } from "src/users/resolvers/drivers.resolver"
import { VendorResolver } from "src/users/resolvers/vendors.resolver"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, CommonUserResolver, AdminResolver, VendorResolver, DriverResolver],
  exports: [UserService],
})
export class UsersModule {}
