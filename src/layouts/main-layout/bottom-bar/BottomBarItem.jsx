import styles from './BottomBarItem.module.css';

function BottomBarItem({ icon, isSelected, onClick }) {
  const IconComponent = icon;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${isSelected ? styles.selected : ''}`}
        onClick={onClick}
      >
        <div className={styles.icon}>{icon}</div>
      </div>
    </div>
  );
}

export default BottomBarItem;
