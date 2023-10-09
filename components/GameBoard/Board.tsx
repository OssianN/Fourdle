import { CSSProperties } from 'react'
import type { Result } from '@/types'
import styles from './board.module.css'

const color: Record<string, string> = {
  Y: 'var(--main-light-green)',
  G: 'var(--main-green)',
  W: 'transparent',
}

export const Board = ({
  rows,
  result,
}: {
  rows: string[][]
  result: Result[][]
}) => {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, box) => {
            return (
              <div
                className={`${styles.letterBox} ${
                  rows[row]?.[box] && styles.fadeAnimation
                } ${result[row]?.[box] && styles.spinAnimation}`}
                key={`${row}${box}`}
                style={
                  {
                    '--box-background': color[result[row]?.[box].color],
                    animationDelay: result[row]?.[box] && `${box * 0.2}s`,
                  } as CSSProperties
                }
              >
                <p
                  className={`${
                    result[row]?.[box] ? styles.letterBoxText : ''
                  }`}
                  style={{
                    animationDelay: result[row]?.[box] && `${box * 0.2}s`,
                  }}
                >
                  {rows[row]?.[box]?.toUpperCase()}
                </p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
