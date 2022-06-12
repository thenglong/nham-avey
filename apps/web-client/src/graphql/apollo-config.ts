import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

import { LOCAL_STORAGE_TOKEN } from "../constants/common-constants"

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
const bearerToken = token ? `Bearer ${token}` : ""

export const isLoggedInVar = makeVar(Boolean(token))
export const authTokenVar = makeVar(bearerToken)

const wsLink = new WebSocketLink({
  uri: "ws:///127.0.0.1:3000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: authTokenVar() || "",
    },
  },
})

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:3000/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: authTokenVar() || "",
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" && definition.operation === "subscription"
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar()
            },
          },
          token: {
            read() {
              return authTokenVar()
            },
          },
        },
      },
    },
  }),
})
