import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import merge from "deepmerge"
import isEqual from "lodash-es/isEqual"

import firebaseServices from "src/services/firebase-services"
import { isClient } from "src/utils/common-utils"

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__"

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const getBearerToken = async () => {
  try {
    const idToken = await firebaseServices.auth.currentUser?.getIdToken()
    return `Bearer ${idToken}`
  } catch (err) {
    // TODO: Setup logger
    // eslint-disable-next-line no-console
    console.log("Failed to get Bearer Token", err)
    return ""
  }
}

const getWsLink = () => {
  if (!isClient) return null

  return new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_WS_GRAPHQL_URI as string,
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
  uri: process.env.NEXT_PUBLIC_HTTP_GRAPHQL_URI,
})

const authMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: await getBearerToken(),
    },
  }
})

const splitLink = isClient
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        )
      },
      getWsLink() as WebSocketLink,
      authMiddleware.concat(httpLink)
    )
  : authMiddleware.concat(httpLink)

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: !isClient,
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {},
  })
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (isClient) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}
