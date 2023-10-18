import type { ReactNode } from 'react'
import styles from './modal.module.css'

type Props = {
  closeModal: () => void
  children: ReactNode
}

export const Modal = ({ closeModal, children }: Props) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContentBox}>
        <button className={styles.closeModalButton} onClick={closeModal}>
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  )
}
