module.exports = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  dropSchema: true,
  logging: process.env.NODE_ENV !== "production",
  entities: [`${__dirname}/src/**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/src/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/src/migrations`,
  },
  ...(process.env.IS_HEROKU_DATABASE === "true" && {
    ssl: {
      rejectUnauthorized: false, // TODO: this should be true outside heroku!
    },
  }),
}
