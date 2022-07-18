import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import firebaseService from "src/services/firebase-service"

const getBearerToken = async () => {
  try {
    const idToken = await firebaseService.auth.currentUser?.getIdToken()
    return `Bearer ${idToken}`
  } catch (err) {
    // TODO: Setup logger
    // eslint-disable-next-line no-console
    console.log("Failed to get Bearer Token", err)
    return ""
  }
}

const getWsLink = () => {
  return new WebSocketLink({
    uri: process.env.NX_WS_GRAPHQL_URI as string,
    options: {
      reconnect: true,
      connectionParams: async () => {
        return {
          Authorization: await getBearerToken(),
        }
      },
    },
  })
}

const httpLink = createHttpLink({
  uri: process.env.NX_HTTP_GRAPHQL_URI,
})

const authMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: await getBearerToken(),
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
  getWsLink() as WebSocketLink,
  authMiddleware.concat(httpLink)
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
