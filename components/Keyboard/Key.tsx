'use client'
import styles from './keyboard.module.css'

const colorMap: Record<string, string> = {
  Y: 'var(--main-light-green)',
  G: 'var(--main-green)',
  W: 'grey',
  B: 'var(--background-color)',
}

export const Key = ({ letter, color }: { letter: string; color: string }) => {
  const handleClick = ({
    target,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: (target as HTMLButtonElement).name })
    )
  }

  return (
    <button
      name={letter}
      onClick={handleClick}
      className={styles.key}
      style={{
        background: colorMap[color],
        width: letter === 'Enter' ? 'var(--big-key-size)' : 'var(--key-size)',
        flex: letter === 'Enter' ? 'unset' : '',
      }}
    >
      {letter === 'Backspace' ? '⌫' : letter}
    </button>
  )
}
