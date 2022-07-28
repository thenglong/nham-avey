import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Column, Entity } from "typeorm"

@InputType("ImageInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "images" })
export class Image extends CoreEntity {
  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 255 })
  @IsString()
  url: string

  @Field(() => String, { nullable: false })
  @Column({ nullable: true, type: "varchar", length: 50 })
  @IsString()
  blurhash?: string
}
