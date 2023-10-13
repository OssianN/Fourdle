'use state'
import { useEffect, useState } from 'react'

export const useStateWithLocalStorage = <T>({
  key,
  initialState,
}: {
  key: string
  initialState: T
}) => {
  const [state, setState] = useState<T>(initialState)
  const [firstLoad, setFirstLoad] = useState<boolean>(false)

  useEffect(() => {
    setFirstLoad(true)

    const stored = localStorage.getItem(key)
    if (!stored) return

    setState(JSON.parse(stored))
  }, [key])

  useEffect(() => {
    if (!firstLoad) return

    localStorage.setItem(key, JSON.stringify(state))
  }, [firstLoad, key, state])

  return { state, setState }
}
