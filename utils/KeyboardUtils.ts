import { Result } from '@/types'

export const keys: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]

export const findColor = (rows: Result[], key: string) =>
  rows
    .filter(({ letter }) => letter === key)
    .sort((a, b) => colorHierarchy[a.color] - colorHierarchy[b.color])[0]
    ?.color ?? 'B'

const colorHierarchy: Record<string, number> = {
  G: 0,
  Y: 1,
  W: 2,
}
