import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { Verification } from "src/users/entities/verification.entity"
import { UsersResolver } from "src/users/users.resolvers"
import { UserService } from "src/users/users.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersResolver, UserService],
  exports: [UserService],
})
export class UsersModule {}
