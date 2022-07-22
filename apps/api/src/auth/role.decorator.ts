import { SetMetadata } from "@nestjs/common"
import { UserRole } from "src/users/entities/user.entity"

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles)

export const AnyRoles = () => Roles(UserRole.Customer, UserRole.Admin, UserRole.Driver, UserRole.Customer)
