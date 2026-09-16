import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Economics.module.css'

type Metric = {
  figure: string
  /** Word-length figures render a size smaller than numerals. */
  wide?: boolean
  label: string
  description: string
}

const METRICS: Metric[] = [
  {
    figure: '$0',
    label: 'Per month in tokens',
    description: 'The model runs on your hardware. No meter running.',
  },
  {
    figure: 'One time setup',
    wide: true,
    label: 'Not a subscription',
    description: 'A low entry price, sized to your team.',
  },
  {
    figure: '256K',
    label: 'Tokens of context',
    description: 'A full contract or report held in one piece.',
  },
  {
    figure: 'Dozens',
    wide: true,
    label: 'Of people at once',
    description: 'Concurrent use across the company, without slowing down.',
  },
]

export function Economics({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <Slide
      label="Economics"
      className={styles.economics}
      kicker="04 — The economics"
      ref={ref}
    >
      <div className={`fit-box ${styles.frame}`}>
        <div className={styles.grid}>
          {METRICS.map((metric) => (
            <div key={metric.label} className={styles.cell}>
              <div className={styles.figure}>
                <p
                  className={
                    metric.wide
                      ? `${styles.figureText} ${styles.figureTextWide}`
                      : styles.figureText
                  }
                >
                  {metric.figure}
                </p>
              </div>
              <div className={styles.caption}>
                <p className={styles.captionLabel}>{metric.label}</p>
                <p className={styles.captionText}>{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}
