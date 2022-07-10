import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserRecord, CreateRequest } from "firebase-admin/auth"
import { FirebaseAuthenticationService } from "src/firebase-admin/firebase-admin-authentication.service"
import { CreateAccountInput, CreateAccountOutput } from "src/users/dtos/create-account.dto"
import { CreateAdminArgs, CreateAdminOutput } from "src/users/dtos/create-admin.dto"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { UserProfileOutput } from "src/users/dtos/user-profile.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly firebaseAuthService: FirebaseAuthenticationService,
  ) {}

  private async createFirebaseUser(createRequest: CreateRequest, customClaims: object): Promise<{ token: string; user: UserRecord }> {
    const firebaseUser = await this.firebaseAuthService.createUser(createRequest)
    const token = await this.firebaseAuthService.createCustomToken(firebaseUser.uid, customClaims)
    return {
      token,
      user: firebaseUser,
    }
  }

  private async checkIfUserExist(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } })
    return user !== null
  }

  private async createUser(id: string, input: CreateAccountInput | CreateAdminArgs): Promise<User> {
    const userEntity = this.userRepo.create({ id, ...input, role: UserRole.Admin })
    return this.userRepo.save(userEntity)
  }

  async createCustomer(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    const exist = await this.checkIfUserExist(createAccountInput.email)
    if (exist) {
      return {
        ok: false,
        error: `[App] User with email ${createAccountInput.email} already exist!`,
      }
    }

    const { user: firebaseUser, token } = await this.createFirebaseUser(createAccountInput, { roles: [UserRole.Customer] })
    const user = await this.createUser(firebaseUser.uid, createAccountInput)

    return { ok: true, user, token }
  }

  async createAdmin(createAdminArgs: CreateAdminArgs): Promise<CreateAdminOutput> {
    try {
      const exist = await this.checkIfUserExist(createAdminArgs.email)
      if (exist) {
        return {
          ok: false,
          error: "[App] There is a user with that email already!",
        }
      }

      const { token, user: firebaseUser } = await this.createFirebaseUser(createAdminArgs, { roles: [UserRole.Admin] })
      const user = await this.createUser(firebaseUser.uid, createAdminArgs)

      // TODO: send verify email here

      return { ok: true, user, token }
    } catch (err) {
      return {
        ok: false,
        error: "[App] Couldn't create account",
      }
    }
  }

  async findById(id: string): Promise<UserProfileOutput> {
    try {
      const user = await this.userRepo.findOneByOrFail({ id })
      return {
        ok: true,
        user,
      }
    } catch (error) {
      return {
        ok: false,
        error: "[App] User Not Found",
      }
    }
  }

  async editProfile(id: string, { email }: EditProfileInput): Promise<EditProfileOutput> {
    try {
      const user = await this.userRepo.findOneBy({
        id: id,
      })
      if (!user) {
        return {
          ok: false,
          error: "[App] User not found",
        }
      }

      if (email) {
        user.email = email
        user.verified = false

        // TODO: Resend verify email here
      }

      await this.userRepo.save(user)
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: "[App] Could not update profile",
      }
    }
  }
}
