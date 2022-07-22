import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { AdminsResolver } from "src/users/resolvers/admins.resolvers"
import { CommonUsersResolver } from "src/users/resolvers/common-users.resolvers"
import { CustomersResolver } from "src/users/resolvers/customers.resolvers"
import { DriverResolver } from "src/users/resolvers/drivers.resolvers"
import { VendorsResolver } from "src/users/resolvers/vendors.resolvers"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CustomersResolver, VendorsResolver, CommonUsersResolver, AdminsResolver, DriverResolver, UserService],
  exports: [UserService],
})
export class UsersModule {}
