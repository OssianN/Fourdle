import { Result } from '@/types'

export const checkResult = async (
  rows: Result[][],
  currentIndex: number
): Promise<Result[]> => {
  const res = await fetch('/api/check', {
    method: 'POST',
    body: JSON.stringify({
      word: rows[currentIndex].map(({ letter }) => letter).join(''),
    }),
  })
  return await res.json()
}

export const addKey = (
  rows: Result[][],
  currentIndex: number,
  e: KeyboardEvent
) =>
  rows.map((row, i) =>
    i !== currentIndex
      ? [...row]
      : [...row, { letter: e.key.toUpperCase(), color: '' }]
  )
