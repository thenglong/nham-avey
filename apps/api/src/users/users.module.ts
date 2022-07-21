import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { AdminsResolver } from "src/users/resolvers/admins.resolvers"
import { CustomersResolver } from "src/users/resolvers/customers.resolvers"
import { VendorsResolver } from "src/users/resolvers/vendors.resolvers"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CustomersResolver, VendorsResolver, AdminsResolver, UserService],
  exports: [UserService],
})
export class UsersModule {}
