import { GetMeQuery } from "src/__generated__/types.react-apollo"

declare module "next-auth" {
  type User = GetMeQuery["me"] & { accessToken: string }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires?: string
    user?: User
  }
}
