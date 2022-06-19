import { GetMeQuery } from "../src/__generated__/types.react-apollo"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: GetMeQuery["me"] & { accessToken: string }
  }
}
