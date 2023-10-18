import { CSSProperties } from 'react'
import type { Result } from '@/types'
import styles from './board.module.css'

const colorMap: Record<string, string> = {
  Y: 'var(--main-light-yellow)',
  G: 'var(--main-green)',
  W: 'transparent',
}

export const Board = ({ rows }: { rows: Result[][] }) => {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, box) => {
            const boxColor = rows[row]?.[box]?.color
            const boxLetter = rows[row]?.[box]?.letter

            return (
              <div
                className={`${styles.letterBox} ${
                  boxLetter && styles.fadeAnimation
                } ${boxColor && styles.spinAnimation}`}
                key={`${row}${box}`}
                style={
                  {
                    '--box-background': colorMap[boxColor],
                    animationDelay: boxColor && `${box * 0.2}s`,
                  } as CSSProperties
                }
              >
                <p
                  className={`${boxColor ? styles.letterBoxText : ''}`}
                  style={{
                    animationDelay: boxColor && `${box * 0.2}s`,
                  }}
                >
                  {boxLetter?.toUpperCase()}
                </p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
