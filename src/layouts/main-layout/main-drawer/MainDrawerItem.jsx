import styles from './MainDrawerItem.module.css';

function DrawerItem({ icon, isOpened, label = '', isSelected, onClick }) {
  return (
    <div className={styles.drawerItemContainer}>
      <div
        className={`${styles.drawerItem} ${
          isOpened ? styles.opened : styles.closed
        } ${isSelected ? styles.selected : ''}`}
        onClick={onClick}
      >
        <div className={styles.icon}>{icon}</div>
        {isOpened && <span className={styles.label}>{label}</span>}
      </div>
    </div>
  );
}

export default DrawerItem;
