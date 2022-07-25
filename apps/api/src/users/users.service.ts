import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateRequest, UserRecord } from "firebase-admin/auth"
import { FirebaseAuthenticationService } from "src/firebase-admin/services/firebase-admin-authentication.service"
import { User, UserRole } from "src/users/entities/user.entity"
import {
  AdminUpdateUserInput,
  AdminUpdateUserOutput,
  CreateAccountInput,
  CreateAccountOutput,
  DeleteAccountOutput,
  PaginatedUsersOutput,
  PaginationUserArgs,
  SignUpAccountInput,
  SignUpAccountOutput,
  UpdateProfileInput,
  UpdateProfileOutput,
} from "src/users/users.dto"
import { In, Repository } from "typeorm"
import { DeepPartial } from "typeorm/common/DeepPartial"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly firebaseAuthService: FirebaseAuthenticationService,
  ) {}

  private async createFirebaseUser(createRequest: CreateRequest, customClaims: object): Promise<UserRecord> {
    // prevent auth/invalid-photo-url
    if (!createRequest.photoURL) {
      delete createRequest.photoURL
    }

    const firebaseUser = await this.firebaseAuthService.createUser(createRequest)
    await this.firebaseAuthService.setCustomUserClaims(firebaseUser.uid, customClaims)
    return firebaseUser
  }

  private async checkIfUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } })
    return user !== null
  }

  private async createUser(entityLike: DeepPartial<User>): Promise<User> {
    const userEntity = this.userRepo.create(entityLike)
    return this.userRepo.save(userEntity)
  }

  async findUserById(id: string) {
    return this.userRepo.findOneBy({ id })
  }

  async findUsersByIds(ids: string[]) {
    return this.userRepo.findBy({ id: In(ids) })
  }

  async signUpVendor(input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    const { lastName, photoURL, firstName, email } = input
    const existing = await this.checkIfUserExistByEmail(input.email)
    if (existing) return { ok: false, error: `[App] User with email ${input.email} already exist!` }

    const firebaseUser = await this.createFirebaseUser(input, { roles: [UserRole.Vendor] })
    const signInToken = await this.firebaseAuthService.createCustomToken(firebaseUser.uid)
    const user = await this.createUser({
      id: firebaseUser.uid,
      email,
      firstName,
      lastName,
      photoURL,
      roles: [UserRole.Vendor],
    })

    return { ok: true, user, signInToken }
  }

  async signUpDriver(input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    const { lastName, photoURL, firstName, email } = input
    const existing = await this.checkIfUserExistByEmail(email)
    if (existing) return { ok: false, error: `[App] User with email ${email} already exist!` }

    const firebaseUser = await this.createFirebaseUser(input, { roles: [UserRole.Driver] })
    const signInToken = await this.firebaseAuthService.createCustomToken(firebaseUser.uid)
    const user = await this.createUser({
      id: firebaseUser.uid,
      email,
      firstName,
      lastName,
      photoURL,
      roles: [UserRole.Driver],
    })

    return { ok: true, user, signInToken }
  }

  async signUpCustomer(input: SignUpAccountInput): Promise<SignUpAccountOutput> {
    const { email, photoURL, firstName, lastName } = input
    const existing = await this.checkIfUserExistByEmail(email)
    if (existing) return { ok: false, error: `[App] User with email ${email} already exist!` }

    const firebaseUser = await this.createFirebaseUser(input, { roles: [UserRole.Customer] })
    const signInToken = await this.firebaseAuthService.createCustomToken(firebaseUser.uid)
    const user = await this.createUser({
      id: firebaseUser.uid,
      email,
      firstName,
      lastName,
      photoURL,
      roles: [UserRole.Customer],
    })

    return { ok: true, user, signInToken }
  }

  async createAdmin(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const { email, photoURL, firstName, lastName } = input
    const existing = await this.checkIfUserExistByEmail(email)
    if (existing) return { ok: false, error: "[App] There is a user with that email already!" }

    const firebaseUser = await this.createFirebaseUser(input, { roles: [UserRole.Admin] })
    const user = await this.createUser({
      id: firebaseUser.uid,
      email,
      firstName,
      lastName,
      photoURL,
      roles: [UserRole.Admin],
    })

    return { ok: true, user }
  }

  async updateProfile(id: string, { email }: UpdateProfileInput): Promise<UpdateProfileOutput> {
    const user = await this.userRepo.findOneBy({ id: id })
    if (!user) return { ok: false, error: "[App] User not found" }

    if (email) {
      user.email = email
      user.isVerified = false
      // TODO: Resend verify email here
    }
    await this.userRepo.save(user)
    return { ok: true }
  }

  async getUsersByAdmin(args: PaginationUserArgs): Promise<PaginatedUsersOutput> {
    const {
      searchQuery,
      pageOptions: { skip, take },
      role,
    } = args
    const queryBuilder = this.userRepo.createQueryBuilder("user")

    if (searchQuery)
      queryBuilder.where(
        `
                user.email ILIKE :searchQuery
                OR
                user.firstName ILIKE :searchQuery
                OR
                user.lastName ILIKE :searchQuery

           `,
        { searchQuery },
      )
    if (role) queryBuilder.andWhere(`:role = ANY(user.roles)`, { role })

    const matchedCount = await queryBuilder.getCount()

    queryBuilder
      .orderBy("user.email", "ASC")
      .skip(skip) //
      .take(take) //

    const users = await queryBuilder.getMany()
    const paginatedOutput = new PaginatedUsersOutput(args, matchedCount)
    return {
      data: users,
      ...paginatedOutput,
    }
  }

  async deleteUser(userId: string): Promise<DeleteAccountOutput> {
    await this.firebaseAuthService.deleteUser(userId)
    const result = await this.userRepo.softDelete({ id: userId })
    return {
      ok: (result.affected as number) > 0,
      error: null,
    }
  }

  async updateUserByAdmin(input: AdminUpdateUserInput): Promise<AdminUpdateUserOutput> {
    const { userId } = input
    const existing = await this.userRepo.findOneBy({ id: userId })
    if (!existing) return { ok: false, error: `[App] User with id ${userId} not found!` }

    const user = Object.assign(existing, input)
    await this.userRepo.save(user)
    return { ok: true }
  }
}
