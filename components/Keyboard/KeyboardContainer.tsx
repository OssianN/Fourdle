import type { Result } from '@/types'
import { Key } from './Key'
import styles from './keyboard.module.css'
import { findColor, keys } from '@/utils/KeyboardUtils'

export const KeybaordContainer = ({ result }: { result: Result[] }) => {
  return (
    <div className={styles.keyboardContainer}>
      {keys.map((row, i) => (
        <div className={styles.keyboardRow} key={i}>
          {row.map(key => (
            <Key letter={key} key={key} color={findColor(result, key)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default KeybaordContainer
