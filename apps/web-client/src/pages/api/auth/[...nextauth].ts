import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import {
  GetMeDocument,
  GetMeQuery,
  GetMeQueryVariables,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "src/__generated__/types.react-apollo"

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NX_HTTP_GRAPHQL_URI,
  }),
  cache: new InMemoryCache(),
})

const login = (email: string, password: string) => {
  return apolloClient.mutate<LoginMutation, LoginMutationVariables>({
    mutation: LoginDocument,
    fetchPolicy: "no-cache",
    variables: {
      loginInput: {
        email,
        password,
      },
    },
  })
}

const getMe = (accessToken: string) => {
  return apolloClient.query<GetMeQuery, GetMeQueryVariables>({
    query: GetMeDocument,
    fetchPolicy: "no-cache",
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Nham Avey (credentials)",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Record<"email" | "password", string>

        const { data: loginData } = await login(email, password)
        if (loginData?.login.error) {
          throw new Error(loginData.login.error)
        }
        const { data: userData } = await getMe(loginData?.login.token as string)
        const user = { ...userData.me, accessToken: loginData?.login.token }
        return user
      },
    }),
  ],
  // secret: process.env.SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  // jwt: {
  //   secret: process.env.SECRET,
  // },
  pages: {
    // signIn: "/login", // Displays signin buttons
    // signOut: "/auth/signout", // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          accessToken: token.accessToken as string,
        },
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, ...restUserData } = user
        return {
          ...token,
          ...restUserData,
          accessToken,
          // refreshToken: user.refreshToken,
        }
      }
      return token
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},
  debug: true,
})
