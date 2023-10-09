'use client'
import { useEffect, useState } from 'react'
import { Board } from '@/components/GameBoard/Board'
import KeybaordContainer from '@/components/Keyboard/KeyboardContainer'
import { Result } from '@/types'
import { addKey, checkResult } from '@/utils/BoardUtils'
import styles from './home.module.css'

export default function Home() {
  const [rows, setRows] = useState<string[][]>([[]])
  const [result, setResult] = useState<Result[][]>([])
  const currentIndex = rows.length - 1

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isKeyOrCommand = /^(?:[A-Za-z]|Enter|Backspace)$/

      if (!isKeyOrCommand.test(e.key)) return
      if (e.key === 'Enter' && rows[currentIndex].length !== 4) return

      if (e.key === 'Enter') {
        const newResultRow = await checkResult(rows, currentIndex)
        setResult([...result, newResultRow])
        setRows([...rows, []])
        return
      }

      if (e.key === 'Backspace') {
        rows[currentIndex].pop()
        setRows([...rows])
        return
      }

      if (rows[currentIndex].length < 4) {
        const newRow = addKey(rows, currentIndex, e)
        setRows(newRow)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, result, rows])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Fourdle</h1>
      <Board rows={rows} result={result} />
      <KeybaordContainer result={result.flat()} />
    </main>
  )
}
