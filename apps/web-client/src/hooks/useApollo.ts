import { useMemo } from "react"

import { ApolloClient, NormalizedCacheObject } from "@apollo/client"

import {
  APOLLO_STATE_PROP_NAME,
  initializeApollo,
} from "apps/web-client/src/graphql/apollo-config"

const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}

export default useApollo
