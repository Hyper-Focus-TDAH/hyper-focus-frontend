import styles from './Divider.module.css';

function Divider({ style }) {
  return <hr className={styles.divider} style={style} />;
}

export default Divider;
