import styles from './EmptyState.module.css';

function EmptyState({ message }) {
  return (
    <div className={styles.container}>
      <span className="h4">{message}</span>
    </div>
  );
}

export default EmptyState;
