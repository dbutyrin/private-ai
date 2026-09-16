import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Delivery.module.css'

const STEPS = [
  {
    title: 'Connected to your documents from day one',
    description:
      'It answers on your contracts, your policies and your files — not on the open internet.',
  },
  {
    title: 'We pick and configure the model remotely',
    description:
      'Against the work your team actually does. Nobody on your side needs to learn how it works.',
  },
  {
    title: 'Three to four days from box to first real answer',
    description:
      'Measured from the hardware arriving, not from the contract being signed.',
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
