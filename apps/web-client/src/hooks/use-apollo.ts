import { useMemo } from "react"

import { APOLLO_STATE_PROP_NAME, initializeApollo } from "src/graphql/apollo-config"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(state), [state])
}

export default useApollo
