// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Optional<T> = T | any

export type TableType<T> = Optional<T>

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export interface SelectOption {
  label: string
  value: string | number
}
