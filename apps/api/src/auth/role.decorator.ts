import { SetMetadata } from "@nestjs/common"
import { UserRole } from "src/users/entities/user.entity"

export const Role = (...roles: UserRole[]) => SetMetadata("roles", roles)
