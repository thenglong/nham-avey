import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react"

import { QueryResult } from "@apollo/client"

import { RestaurantsQuery, RestaurantsQueryVariables } from "@nham-avey/common"
import { DEFAULT_PAGE_STATE } from "src/constants/common-constants"

export interface PageState {
  page: number
  take: number
  q: string
}

type RestaurantData = QueryResult<RestaurantsQuery, RestaurantsQueryVariables>["data"]

interface RestaurantPageState {
  pageState: PageState
  setPageState: Dispatch<SetStateAction<PageState>>
  scrollYPosition: number
  setScrollYPosition: Dispatch<SetStateAction<number>>
  loadedRestaurants: RestaurantData
  setLoadedRestaurants: Dispatch<SetStateAction<RestaurantData>>
}

const RestaurantPageStateContext = createContext<RestaurantPageState | null>(null)

const RestaurantPageStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [pageState, setPageState] = useState(DEFAULT_PAGE_STATE)
  const [loadedRestaurants, setLoadedRestaurants] = useState<RestaurantData>()
  const [scrollYPosition, setScrollYPosition] = useState(0)

  return (
    <RestaurantPageStateContext.Provider
      value={{
        pageState,
        setPageState,
        loadedRestaurants,
        setLoadedRestaurants,
        scrollYPosition,
        setScrollYPosition,
      }}
    >
      {children}
    </RestaurantPageStateContext.Provider>
  )
}

export const useRestaurantPageStateContext = () => {
  const context = useContext(RestaurantPageStateContext)
  if (!context) {
    throw new Error(
      "useRestaurantPageStateContext must be used within a RestaurantPageStateContext"
    )
  }
  return context
}

export default RestaurantPageStateContextProvider
