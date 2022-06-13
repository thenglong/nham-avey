import { useMemo } from "react"

import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../graphql/apollo-config"

const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(state), [state])
}

export default useApollo
