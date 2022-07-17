import { Field, ObjectType } from "@nestjs/graphql"
import { Exclude } from "class-transformer"
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@ObjectType()
export abstract class CoreWithoutIdEntity {
  @CreateDateColumn()
  @Field(() => Date)
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date

  @UpdateDateColumn()
  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamptz" })
  @Exclude()
  updatedAt: Date

  @DeleteDateColumn({ type: "timestamptz" })
  @Exclude()
  deletedAt: Date
}

@ObjectType()
export abstract class CoreEntity extends CoreWithoutIdEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number
}
