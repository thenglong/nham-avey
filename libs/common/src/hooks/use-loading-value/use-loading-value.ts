import { useCallback, useMemo, useReducer } from "react"

export type UseLoadingValue<T, E> = {
  error?: E
  isLoading: boolean
  reset: () => void
  setError: (error: E) => void
  setValue: (value?: T) => void
  value?: T
}

type ReducerState<E> = {
  error?: E
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
}

type ErrorAction<E> = { type: "error"; error: E }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResetAction = { type: "reset"; defaultValue?: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValueAction = { type: "value"; value: any }
type ReducerAction<E> = ErrorAction<E> | ResetAction | ValueAction

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultState = (defaultValue?: any) => {
  return {
    loading: defaultValue === undefined || defaultValue === null,
    value: defaultValue,
  }
}

const reducer = <E>() => {
  return (state: ReducerState<E>, action: ReducerAction<E>): ReducerState<E> => {
    switch (action.type) {
      case "error":
        return {
          ...state,
          error: action.error,
          loading: false,
          value: undefined,
        }
      case "reset":
        return defaultState(action.defaultValue)
      case "value":
        return {
          ...state,
          error: undefined,
          loading: false,
          value: action.value,
        }
      default:
        return state
    }
  }
}

export const useLoadingValue = <T, E>(
  getDefaultValue?: () => T
): UseLoadingValue<T, E> => {
  const defaultValue = getDefaultValue ? getDefaultValue() : undefined
  const [state, dispatch] = useReducer(reducer<E>(), defaultState(defaultValue))

  const reset = useCallback(() => {
    const defaultValue = getDefaultValue ? getDefaultValue() : undefined
    dispatch({ type: "reset", defaultValue })
  }, [getDefaultValue])

  const setError = useCallback((error: E) => {
    dispatch({ type: "error", error })
  }, [])

  const setValue = useCallback((value?: T) => {
    dispatch({ type: "value", value })
  }, [])

  return useMemo(
    () => ({
      error: state.error,
      isLoading: state.loading,
      reset,
      setError,
      setValue,
      value: state.value,
    }),
    [state.error, state.loading, reset, setError, setValue, state.value]
  )
}

export default useLoadingValue
