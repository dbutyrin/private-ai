import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Mechanism.module.css'

export function Mechanism({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <Slide
      label="Mechanism"
      className={styles.mechanism}
      kicker="03 — The work"
      ref={ref}
    >
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3 className={styles.label}>Sounds like</h3>
          <p className={styles.copy}>
            Months of work. Servers to buy. An IT department you don't have. A
            painful integration that stalls somewhere in the second quarter.
          </p>
        </div>

        <div className={`${styles.column} ${styles.columnTrue}`}>
          <h3 className={`${styles.label} ${styles.labelTrue}`}>Actually is</h3>
          <p className={`${styles.copy} ${styles.copyTrue}`}>
            You plug the box into power and into your network. Model selection,
            configuration and document connection we handle remotely.
          </p>
        </div>
      </div>
    </Slide>
  )
}
