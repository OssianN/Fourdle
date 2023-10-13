'use client'
import { useEffect } from 'react'
import { Board } from '@/components/GameBoard/Board'
import KeybaordContainer from '@/components/Keyboard/KeyboardContainer'
import { Result } from '@/types'
import { addKey, checkResult } from '@/utils/BoardUtils'
import styles from './home.module.css'
import { useStateWithLocalStorage } from '@/utils/useStateWithLocalStorage'

type UserData = {
  rows: string[][]
  result: Result[][]
}

export default function Home() {
  const {
    state: { rows, result },
    setState: setUserData,
  } = useStateWithLocalStorage<UserData>({
    key: 'userData',
    initialState: { rows: [[]], result: [] },
  })
  const currentIndex = rows.length - 1

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isKeyOrCommand = /^(?:[A-Za-z]|Enter|Backspace)$/

      if (!isKeyOrCommand.test(e.key)) return
      if (e.key === 'Enter' && rows[currentIndex].length !== 4) return

      if (e.key === 'Enter') {
        const newResultRow = await checkResult(rows, currentIndex)
        setUserData({
          result: [...result, newResultRow],
          rows: [...rows, []],
        })
        return
      }

      if (e.key === 'Backspace') {
        rows[currentIndex].pop()
        setUserData(prev => ({
          ...prev,
          rows: [...rows],
        }))
        return
      }

      if (rows[currentIndex].length < 4) {
        const newRow = addKey(rows, currentIndex, e)
        setUserData(prev => ({
          ...prev,
          rows: newRow,
        }))
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, result, rows, setUserData])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Fourdle</h1>
      <Board rows={rows} result={result} />
      <KeybaordContainer result={result.flat()} />
    </main>
  )
}
