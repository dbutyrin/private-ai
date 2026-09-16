import styles from './SectionNav.module.css'

type SectionNavProps = {
  labels: readonly string[]
  active: number
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

export function SectionNav({
  labels,
  active,
  onSelect,
  onPrev,
  onNext,
}: SectionNavProps) {
  return (
    <nav aria-label="Sections" className={styles.rail}>
      <button
        type="button"
        aria-label="Previous section"
        className={styles.arrow}
        onClick={onPrev}
      >
        ⇑
      </button>

      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          aria-current={index === active ? 'true' : undefined}
          className={
            index === active ? `${styles.dot} ${styles.dotActive}` : styles.dot
          }
          onClick={() => onSelect(index)}
        />
      ))}

      <button
        type="button"
        aria-label="Next section"
        className={styles.arrow}
        onClick={onNext}
      >
        ⇓
      </button>
    </nav>
  )
}
