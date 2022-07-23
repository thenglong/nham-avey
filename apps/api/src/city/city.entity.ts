import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsOptional, IsString } from "class-validator"
import { CoreEntity } from "src/common/entities/core.entity"
import { Location } from "src/locations/location.entity"
import { Restaurant } from "src/restaurants/entities/restaurant.entity"
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm"

@InputType("CityInputType", { isAbstract: true })
@ObjectType()
@Entity({ name: "cities" })
export class City extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  name: string

  @Field(type => String)
  @Column({ nullable: false })
  @IsString()
  slug: string

  @Field(() => String, { nullable: true })
  @Column()
  @IsString()
  @IsOptional()
  nameInKhmer?: string

  @Field(() => Location, { nullable: true })
  @OneToOne(() => Location, { nullable: true })
  @JoinColumn({ name: "location_id", referencedColumnName: "id" })
  location?: Location

  @OneToMany(() => Restaurant, restaurant => restaurant.city, { nullable: true })
  restaurants?: Restaurant[]
}
