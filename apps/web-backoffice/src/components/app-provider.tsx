import { ReactNode } from "react"

import { ApolloProvider } from "@apollo/client/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ConfigProvider as AntConfigProvider } from "antd"
import { HelmetProvider } from "react-helmet-async"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import AudioAlertContextProvider from "src/context/AudioAlertContext"
import { client } from "src/graphql/apollo-config"
import store from "src/redux/store"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AntConfigProvider componentSize="large">
          <ReduxProvider store={store}>
            <ApolloProvider client={client}>
              <AudioAlertContextProvider>
                <QueryClientProvider client={queryClient}>
                  <ReactQueryDevtools initialIsOpen={false} />
                  {children}
                </QueryClientProvider>
              </AudioAlertContextProvider>
            </ApolloProvider>
          </ReduxProvider>
        </AntConfigProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default AppProvider
