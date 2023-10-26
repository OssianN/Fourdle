'use client'
import { useEffect, useState } from 'react'
import { Board } from '@/components/GameBoard/Board'
import KeybaordContainer from '@/components/Keyboard/KeyboardContainer'
import { Result } from '@/types'
import { addKey, checkResult } from '@/utils/BoardUtils'
import styles from './home.module.css'
import { useStateWithLocalStorage } from '@/utils/useStateWithLocalStorage'
import { SettingsPane } from '@/components/SettingsPane'
import { Modal } from '@/components/Modal'

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
  const [showFinishedGame, setShowFinishedGame] = useState<boolean>(false)
  const [correctGuess, setCorrectGuess] = useState<boolean>(false)
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
        const updatedRows = addKey(rows, currentIndex, e.key.toUpperCase())
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
      setCorrectGuess(true)
      setTimeout(() => {
        setShowFinishedGame(true)
      }, 1500)
      return
    }

    if (rows.length === 7) {
      setTimeout(() => {
        setShowFinishedGame(true)
      }, 1500)
      return
    }
  }, [currentIndex, rows, setUserData])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Fourdle</h1>

      <SettingsPane />
      <Board rows={rows} />
      <KeybaordContainer rows={rows.flat()} />
      {showFinishedGame && (
        <Modal closeModal={() => setShowFinishedGame(false)}>
          <div className={styles.resultsModal}>
            {correctGuess ? <h2>Correct!</h2> : <h2>You suuuck!</h2>}
            {correctGuess ? (
              <p>Come back tomorrow to guess the new word.</p>
            ) : (
              <p>
                You had six guesses, with clues and everything, and still did
                not get it right!
              </p>
            )}
            <p>
              You guessed:{' '}
              {rows[currentIndex - 1].map(({ letter }) => letter).join('')}
            </p>
          </div>
        </Modal>
      )}
    </main>
  )
}
