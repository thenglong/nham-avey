const configs = () => ({
  port: +(process.env.PORT as string) || 3000,
  serverApiKey: process.env.SERVER_API_KEY,
  enableSwagger: process.env.ENABLE_SWAGGER === "true",
  firebase: {
    serviceAccount: JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON ?? "{}"),
    bucketUrl: process.env.FIREBASE_STORAGE_BUCKET_URL,
  },
  db: {
    url: process.env.DATABASE_URL,
    logging: process.env.DATABASE_LOGGING === "true" ? true : process.env.DATABASE_LOGGING,
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  isProd: process.env.NODE_ENV === "production",
})

export default configs
