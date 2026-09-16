import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Qualifier.module.css'

export function Qualifier({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <Slide
      label="Qualifier"
      className={styles.qualifier}
      kicker="01 — The premise"
      ref={ref}
    >
      <h2 className={styles.headline}>
        Your team already pasted company data into public ChatGPT today. The
        question isn't whether it happened. The question is what exactly went in.
      </h2>

      <p className={styles.aside}>
        If the honest answer is “nothing sensitive, nothing regulated” — this
        page isn't for you.
      </p>
    </Slide>
  )
}
