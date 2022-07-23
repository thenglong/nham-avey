import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsString } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, ManyToMany } from "typeorm"

@InputType("CategoryInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "categories" })
export class Category extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  name: string

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  iconUrl: string

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImageUrl: string

  @Field(type => String)
  @Column()
  @IsString()
  slug: string

  @ManyToMany(type => Restaurant, restaurant => restaurant.categories)
  restaurants: Restaurant[]
}
