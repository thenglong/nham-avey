import { TypedUseSelectorHook, useSelector } from "react-redux"

import { RootState } from "src/redux/store"

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
