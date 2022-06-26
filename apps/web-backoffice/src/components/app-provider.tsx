import { ReactNode } from "react"

import { ConfigProvider as AntConfigProvider } from "antd"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import AudioAlertContextProvider from "src/context/AudioAlertContext"
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
            <AudioAlertContextProvider>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                {children}
              </QueryClientProvider>
            </AudioAlertContextProvider>
          </ReduxProvider>
        </AntConfigProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default AppProvider
