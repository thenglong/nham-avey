import { act, renderHook } from "@testing-library/react"
import * as React from "react"

import useLoadingValue from "./use-loading-value"

describe("useLoadingValue", () => {
  it("should render successfully", () => {
    const { result } = renderHook(() => useLoadingValue())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
