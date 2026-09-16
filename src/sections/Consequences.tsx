import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Consequences.module.css'

const CONSEQUENCES = [
  'A letter from a regulator.',
  'A question from a client who found their contract somewhere it shouldn’t be.',
  'A claim, with a number attached to it.',
]

export function Consequences({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <Slide
      label="Consequences"
      className={styles.consequences}
      kicker="02 — The bill"
      ref={ref}
    >
      <h2 className={styles.headline}>
        You won't hear about the leak on the day it happens.
      </h2>

      <div className={styles.grid}>
        {CONSEQUENCES.map((text, index) => (
          <div key={text} className={styles.item}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className={styles.itemText}>{text}</p>
          </div>
        ))}
      </div>

      <p className={styles.aside}>
        And what you pay for won't be the data. It will be the consequences.
      </p>

      <p className={styles.closing}>
        So the question isn't how to ban AI for your employees. It's how to give
        them AI that doesn't carry your data out the door.
      </p>
    </Slide>
  )
}
