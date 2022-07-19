import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString, Length } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, JoinTable, ManyToMany } from "typeorm"

@InputType("CategoryInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "categories" })
export class Category extends CoreEntity {
  @Field(type => String)
  @Column({ unique: true })
  @IsString()
  @Length(4, 50)
  name: string

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImageUrl: string

  @Field(type => String)
  @Column({ unique: true })
  @IsString()
  slug: string

  @ManyToMany(type => Restaurant, restaurant => restaurant.categories)
  restaurants: Restaurant[]
}
