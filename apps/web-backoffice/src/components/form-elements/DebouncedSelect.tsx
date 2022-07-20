import React, { useMemo, useRef, useState } from "react"

import { Select, Spin, Typography } from "antd"
import type { SelectProps } from "antd/es/select"
import debounce from "lodash/debounce"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
}

export function DebouncedSelect<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  return (
    <Select
      showSearch
      labelInValue
      filterOption={true}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  )
}
