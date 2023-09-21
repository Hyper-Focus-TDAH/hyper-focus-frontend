import { Fade } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import spinner from '../../assets/images/spinner.json';
import Lottie from '../lottie/Lottie';
import styles from './LoadingOverlay.module.css';

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
