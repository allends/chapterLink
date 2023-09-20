export type Result<V, E> = {
  Data: V,
  Error: E | undefined
} | {
  Data: V | undefined,
  Error: E
}