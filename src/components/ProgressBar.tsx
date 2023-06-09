import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <progress className={styles.range} value={progress} max="100" />
      </div>
      <span
        className={progress === 100 ? styles.allDone : styles.progressPercent}
      >
        {progress}%
      </span>
    </div>
  );
}