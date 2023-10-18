import { useState } from 'react'
import styles from './settings.module.css'
import { Modal } from '@/components/Modal'

const colorList = [
  {
    description: 'The letter is in the word and in the correct spot.',
    color: 'var(--main-green)',
  },
  {
    description: 'The letter is in the word but in the wrong spot.',
    color: 'var(--main-light-yellow)',
  },
  {
    description: 'The letter is not in the word in any spot.',
    color: 'var(--background-color)',
  },
]

export const SettingsPane = () => {
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false)

  const handleInfoButtonClick = () => {
    setOpenInfoModal(true)
  }
  return (
    <div className={styles.settingsPane}>
      <button onClick={handleInfoButtonClick} className={styles.infoButton}>
        &#9432;
      </button>

      {openInfoModal && (
        <Modal closeModal={() => setOpenInfoModal(false)}>
          <h2>How to play</h2>
          <ul className={styles.infoList}>
            <li>
              Guess the Fourdle in 6 tries. Each guess must be a valid 4-letter
              word.
            </li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>

          <div>
            <ul className={styles.infoColorList}>
              {colorList.map(({ description, color }) => (
                <li key={color} className={styles.infoColor}>
                  <span
                    className={styles.infoColorSpan}
                    style={{ background: color }}
                  />
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  )
}
