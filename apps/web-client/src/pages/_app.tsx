import { useEffect } from "react"

import { ApolloProvider } from "@apollo/client"
import { AppProps } from "next/app"
import Head from "next/head"
import { themeChange } from "theme-change"

import "../styles.css"
import useApollo from "../hooks/useApollo"

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
      <main className="app">
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </main>
    </>
  )
}

export default CustomApp
