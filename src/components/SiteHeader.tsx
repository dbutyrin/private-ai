import styles from './SiteHeader.module.css'

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <span className={styles.wordmark}>Private&nbsp;AI&nbsp;/&nbsp;On-Premise</span>
    </header>
  )
}
