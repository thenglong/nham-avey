import { Field, Float, InputType, ObjectType } from "@nestjs/graphql"
import { IsNumber } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Column, Entity } from "typeorm"

@InputType("LocationInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "locations" })
export class Location extends CoreEntity {
  @Field(() => Float)
  @Column({ type: "float" })
  @IsNumber()
  latitude: number

  @Field(() => Float)
  @Column({ type: "float" })
  @IsNumber()
  longitude: number
}
