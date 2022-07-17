import { useEffect } from "react"

import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { themeChange } from "theme-change"

import useApollo from "src/hooks/use-apollo"
import "src/styles.css"

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <>
      <Head>
        <title>Welcome to nham-avey-fe!</title>
      </Head>
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        session={pageProps.session}
      >
        <main className="app">
          <QueryClientProvider client={queryClient}>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </QueryClientProvider>
        </main>
      </SessionProvider>
    </>
  )
}

export default CustomApp
