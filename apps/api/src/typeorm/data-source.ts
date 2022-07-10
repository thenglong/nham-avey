import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

export const connectionSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  dropSchema: true,
  logging: process.env.NODE_ENV !== "production",
  entities: [`${__dirname}/../../**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  ...(process.env.IS_HEROKU_DATABASE === "true" && {
    ssl: {
      rejectUnauthorized: false, // TODO: this should be true outside heroku!
    },
  }),
})
