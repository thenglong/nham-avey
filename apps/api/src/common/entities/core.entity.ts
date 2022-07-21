import { Field, ObjectType } from "@nestjs/graphql"
import { Exclude } from "class-transformer"
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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

  @Column({ name: "created_by", type: "varchar", length: 255, nullable: true })
  @Exclude()
  public createdBy: string

  @Column({ name: "updated_by", type: "varchar", length: 255, nullable: true })
  @Exclude()
  public updatedBy: string

  @Column({ name: "deleted_by", type: "varchar", length: 255, nullable: true })
  @Exclude()
  public deletedBy: string
}

@ObjectType()
export abstract class CoreEntity extends CoreWithoutIdEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number
}
