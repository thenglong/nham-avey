import createDebug from "debug"

const APPID = "NHAM_AVEY_BO"

const createLogger = () => {
  const base = createDebug(APPID)

  // eslint-disable-next-line no-console
  base.log = console.log.bind(console)

  //creates new debug instance with extended namespace
  const debug = base.extend("debug")
  const error = base.extend("error")

  return {
    log: base,
    debug,
    error,
    withTag: (tag: string) => ({
      log: base.extend(tag),
      debug: debug.extend(tag),
      error: error.extend(tag),
    }),
  }
}

// Auto-enable all logs on Dev env
if (process.env.NODE_ENV === "development") {
  const envDebug = localStorage.getItem("debug")
  if (!envDebug) createDebug.enable(`${APPID}:*`)
}

const logger = createLogger()

export default logger
