import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AdminsResolver } from "src/users/admins.resolvers"
import { CustomersResolver } from "src/users/customers.resolvers"
import { User } from "src/users/entities/user.entity"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CustomersResolver, AdminsResolver, UserService],
  exports: [UserService],
})
export class UsersModule {}
