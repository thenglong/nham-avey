export default () => ({
  port: +(process.env.PORT as string) || 3000,
  serverApiKey: process.env.SERVER_API_KEY,
  enableSwagger: process.env.ENABLE_SWAGGER === "true",
  firebase: {
    serviceAccount: JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT as string),
    bucketUrl: process.env.FIREBASE_STORAGE_BUCKET_URL,
  },
  db: {
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT as string),
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: process.env.DATABASE_LOGGING === "true",
    isHeroku: process.env.IS_HEROKU_DATABASE === "true",
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  isProd: process.env.NODE_ENV === "production",
})
