import type { Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Hero.module.css'

type HeroProps = {
  onEstimateClick: () => void
  ref?: Ref<HTMLElement>
}

export function Hero({ onEstimateClick, ref }: HeroProps) {
  return (
    <Slide label="Hero" className={styles.hero} ref={ref}>
      <h1 className={styles.headline}>
        <span>
          Private AI used to be a large-enterprise privilege.
          <br />
          &nbsp;<span className={styles.turn}>It isn't anymore.</span>
        </span>
      </h1>

      <div className={styles.footRow}>
        <p className={styles.lede}>
          Contracts. Client personal data. Internal financial numbers. All of it
          goes into a chatbot every day — simply because that's faster. And while
          data security is still an agenda item in your next meeting, it has
          already been sitting on somebody else's servers for a while. Piece by
          piece.
        </p>

        <div className={styles.ctaCell}>
          <a
            href="#estimate"
            className={styles.cta}
            onClick={(event) => {
              event.preventDefault()
              onEstimateClick()
            }}
          >
            How much does the solution cost?
            <span className={styles.ctaArrow}>↓</span>
          </a>
        </div>
      </div>
    </Slide>
  )
}
