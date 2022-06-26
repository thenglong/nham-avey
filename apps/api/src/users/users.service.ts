import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MailService } from "src/mail/mail.service"
import { CreateAccountInput } from "src/users/dtos/create-account.dto"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { UserProfileOutput } from "src/users/dtos/user-profile.dto"
import { VerifyEmailOutput } from "src/users/dtos/verify-email.dto"
import { User } from "src/users/entities/user.entity"
import { Verification } from "src/users/entities/verification.entity"
import { Repository } from "typeorm"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly mailService: MailService
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } })

      if (exists) {
        return {
          ok: false,
          error: "[App] There is a user with that email already!",
        }
      }
      const user = await this.users.save(this.users.create({ email, password, role }))

      const verification = await this.verifications.save(
        this.verifications.create({
          user,
        })
      )

      this.mailService.sendVerificationEmail(user.email, verification.code)

      return { ok: true }
    } catch (err) {
      return { ok: false, error: "[App] Couldn't create account" }
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneByOrFail({ id })
      return {
        ok: true,
        user,
      }
    } catch (error) {
      return { ok: false, error: "[App] User Not Found" }
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOneBy({ id: userId })
      if (!user) {
        return { ok: false, error: "[App] User not found" }
      }

      if (email) {
        user.email = email
        user.verified = false

        await this.verifications.delete({ user: { id: user.id } })
        const verification = await this.verifications.save(
          this.verifications.create({
            user,
          })
        )

        this.mailService.sendVerificationEmail(user.email, verification.code)
      }
      if (password) {
        user.password = password
      }

      await this.users.save(user)
      return {
        ok: true,
      }
    } catch (error) {
      return { ok: false, error: "[App] Could not update profile" }
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne({
        where: { code },
        relations: ["user"],
      })
      if (verification) {
        verification.user.verified = true
        await this.users.save(verification.user)
        await this.verifications.delete(verification.id)
        return { ok: true }
      }
      return { ok: false, error: "[App] Verification not found" }
    } catch (error) {
      return { ok: false, error: "[App] Could not verify email" }
    }
  }
}
