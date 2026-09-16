import { useState, type FormEvent, type Ref } from 'react'
import { Slide } from '../components/Slide'
import styles from './Estimate.module.css'

const TEAM_SIZES = [
  { id: 'up-to-5', label: 'Up to 5' },
  { id: '5-10', label: '5–10' },
  { id: '10-plus', label: '10+' },
] as const

type TeamSize = (typeof TEAM_SIZES)[number]['id']

const IDLE_NOTE = 'No call from a salesperson. Just the answer.'
const SENT_NOTE = 'Sent. Your number comes back by email.'

export function Estimate({ ref }: { ref?: Ref<HTMLElement> }) {
  const [teamSize, setTeamSize] = useState<TeamSize | null>(null)
  const [sent, setSent] = useState(false)

  // No backend is wired up yet: the design specifies the optimistic
  // confirmation only. Post `{ teamSize, email, phone }` here once an
  // endpoint exists.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <Slide
      label="Estimate"
      id="estimate"
      className={styles.estimate}
      ref={ref}
    >
      <div className={styles.layout}>
        <h2 className={styles.headline}>
          Want to know what this would cost you specifically?
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Team size</legend>
            <div className={styles.sizeOptions}>
              {TEAM_SIZES.map((option) => {
                const selected = teamSize === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    className={
                      selected
                        ? `${styles.sizeOption} ${styles.sizeOptionActive}`
                        : styles.sizeOption
                    }
                    onClick={() => setTeamSize(option.id)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Email — required</span>
            <input
              className={styles.input}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Phone — optional</span>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+1 000 000 0000"
            />
          </label>

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submit}>
              Get my number
            </button>
            <span className={styles.note} aria-live="polite">
              {sent ? SENT_NOTE : IDLE_NOTE}
            </span>
          </div>
        </form>
      </div>

      <footer className={styles.footer}>
        <span>Runs on your hardware</span>
        <span>Nothing leaves your network</span>
      </footer>
    </Slide>
  )
}
