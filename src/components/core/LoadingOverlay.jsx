import { Fade } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import spinner from '../../assets/images/spinner.json';
import styles from './LoadingOverlay.module.css';
import Lottie from './Lottie';

function LoadingOverlay() {
  const isLoading = useSelector((state) => state.aux.isLoading);

  return (
    <Fade in={isLoading} appear>
      <div
        className={styles.loadingOverlay}
        style={{ display: isLoading ? '' : 'none' }}
      >
        <Lottie data={spinner} size={90} />
      </div>
    </Fade>
  );
}

export default LoadingOverlay;
