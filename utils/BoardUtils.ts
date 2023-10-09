import { Result } from '@/types'

export const checkResult = async (
  rows: string[][],
  currentIndex: number
): Promise<Result[]> => {
  const res = await fetch('/api/check', {
    method: 'POST',
    body: JSON.stringify({ word: rows[currentIndex].join('') }),
  })
  return await res.json()
}

export const addKey = (
  rows: string[][],
  currentIndex: number,
  e: KeyboardEvent
) =>
  rows.map((row, i) =>
    i !== currentIndex ? [...row] : [...row, e.key.toUpperCase()]
  )
