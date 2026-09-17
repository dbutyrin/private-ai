import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Delivery.module.css'

const STEPS = [
  {
    title: 'Connected to your documents from day one',
    description: 'Works directly with your data, not exposing it to the Internet.',
  },
  {
    title: 'We pick and configure the model remotely',
    description: 'Nobody on your side needs to learn how it works. It just works.',
  },
  {
    title: 'Only three days to first real answers',
    description: 'Fast setup and connection to your corporate data.',
  },
  {
    title: 'We move you onto better models as they ship',
    description: 'The hardware you bought keeps getting more capable.',
  },
]

export function Delivery({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <Slide
      label="Delivery"
      className={styles.delivery}
      kicker="05 — Delivery"
      ref={ref}
    >
      <div className={`fit-box ${styles.list}`}>
        {STEPS.map((step, index) => (
          <div key={step.title} className={`fit-row ${styles.row}`}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}
