'use client'
import { useEffect } from 'react'
import { Board } from '@/components/GameBoard/Board'
import KeybaordContainer from '@/components/Keyboard/KeyboardContainer'
import { Result } from '@/types'
import { addKey, checkResult } from '@/utils/BoardUtils'
import styles from './home.module.css'
import { useStateWithLocalStorage } from '@/utils/useStateWithLocalStorage'
import { SettingsPane } from '@/components/SettingsPane'

type UserData = {
  rows: Result[][]
}

const initialState = { rows: [[]] }

export default function Home() {
  const {
    state: { rows },
    setState: setUserData,
  } = useStateWithLocalStorage<UserData>({
    key: 'userData',
    initialState,
  })
  const currentIndex = rows.length - 1

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isKeyOrCommand = /^(?:[A-Za-z]|Enter|Backspace)$/

      if (!isKeyOrCommand.test(e.key)) return
      if (e.key === 'Enter' && rows[currentIndex].length !== 4) return

      if (e.key === 'Enter') {
        const resultRow = await checkResult(rows, currentIndex)
        rows[currentIndex] = resultRow

        setUserData({
          rows: [...rows, []],
        })
        return
      }

      if (e.key === 'Backspace') {
        rows[currentIndex].pop()
        setUserData({
          rows: [...rows],
        })
        return
      }

      if (rows[currentIndex].length < 4) {
        const updatedRows = addKey(rows, currentIndex, e)
        setUserData({
          rows: updatedRows,
        })
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, rows, setUserData])

  useEffect(() => {
    if (rows[currentIndex - 1]?.every(item => item.color === 'G')) {
      setUserData(initialState)
    }
  }, [currentIndex, rows, setUserData])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Fourdle</h1>

      <SettingsPane />
      <Board rows={rows} />
      <KeybaordContainer rows={rows.flat()} />
    </main>
  )
}
