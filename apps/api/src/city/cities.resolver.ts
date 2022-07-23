import { Resolver } from "@nestjs/graphql"
import { City } from "src/city/city.entity"

@Resolver(of => City)
export class CityResolver {
  constructor() {
    // TODO
  }
}
