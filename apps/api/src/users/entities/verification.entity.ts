import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { CoreEntity } from "src/common/entities/core.entity"
import { User } from "src/users/entities/user.entity"
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { v4 as uuidv4 } from "uuid"

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(() => String)
  code: string

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4()
  }
}
