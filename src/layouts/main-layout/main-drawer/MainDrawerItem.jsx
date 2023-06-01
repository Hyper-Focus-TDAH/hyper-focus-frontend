import styles from './MainDrawerItem.module.css';

function DrawerItem({ icon, isOpened, label = '', isSelected, onClick }) {
  return (
    <div
      className={`${styles.drawerItem} ${
        isOpened ? styles.opened : styles.closed
      } ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <div className={styles.icon}>{icon}</div>
      {isOpened && <span>{label}</span>}
    </div>
  );
}

export default DrawerItem;
