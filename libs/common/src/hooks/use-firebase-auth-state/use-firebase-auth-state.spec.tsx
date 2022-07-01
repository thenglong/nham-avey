import { act, renderHook } from "@testing-library/react"
import * as React from "react"

import useFirebaseAuthState from "./use-firebase-auth-state"

describe("useFirebaseAuthState", () => {
  it("should render successfully", () => {
    const { result } = renderHook(() => useFirebaseAuthState())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
