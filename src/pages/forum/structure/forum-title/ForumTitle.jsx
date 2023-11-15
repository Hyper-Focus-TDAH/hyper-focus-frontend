import styles from './ForumTitle.module.css';

function ForumTitle({ title, subtitle }) {
  return (
    <div className={styles.container}>
      <span className="h1 m-0">{title}</span>
      {subtitle && <span className="h4 m-0 mb-2">{subtitle}</span>}
    </div>
  );
}

export default ForumTitle;
