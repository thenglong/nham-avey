import { StrictMode } from "react"

import * as ReactDOM from "react-dom/client"
import App from "src/components/app"
import AppProvider from "src/components/app-provider"

const element = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(element)

root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
