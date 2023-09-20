import { createMemo, createSignal, onMount } from "solid-js"
import { Result } from "./option"

enum Error {
  Generic
}

export const createRequest = <T, E extends Error>(fetcher: () => Promise<T>) => {
  const [loading, setLoading] = createSignal<boolean>(false)
  const [data, setData] = createSignal<T | undefined>(undefined)
  const [error, setError] = createSignal<Error>()

  const fetch = () => {
    setLoading(true)
    fetcher().then((res: T) => {
      setData(() => res)
    }).catch(error => {
      setError(error as Error | E)
    }).finally(() => {
      setLoading(false)
    })
  }

  onMount(() => {
    fetch()
  })

  return {
    loading,
    data,
    error,
    fetch,
  }
}

