import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString, Length } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, OneToMany } from "typeorm"

@InputType("CategoryInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "categories" })
export class Category extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  @Length(4)
  name: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImageUrl: string

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  slug: string

  // TODO: upgrade to m -> m
  @Field(() => [Restaurant], { nullable: true })
  @OneToMany(() => Restaurant, restaurant => restaurant.category)
  restaurants: Restaurant[]
}
