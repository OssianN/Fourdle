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
  const today = new Date().getDay()

  useEffect(() => {
    setFirstLoad(true)

    const stored = localStorage.getItem(key)
    if (!stored) return
    if (JSON.parse(stored).expiry < today) {
      return
    }

    setState(JSON.parse(stored).state)
  }, [key, today])

  useEffect(() => {
    if (!firstLoad) return

    localStorage.setItem(key, JSON.stringify({ state, expiry: today }))
  }, [firstLoad, key, state, today])

  return { state, setState }
}
