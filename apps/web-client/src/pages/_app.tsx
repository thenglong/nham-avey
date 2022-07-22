import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AppProps } from "next/app"
import Head from "next/head"

import useApollo from "src/hooks/use-apollo"
import "src/styles.css"

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <Head>
        <title>Welcome to nham-avey-fe!</title>
      </Head>
      <main className="app">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </QueryClientProvider>
      </main>
    </>
  )
}

export default CustomApp
