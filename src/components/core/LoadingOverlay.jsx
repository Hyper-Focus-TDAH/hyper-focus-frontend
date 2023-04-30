import { Fade, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from './LoadingOverlay.module.css';
import spinner from '../../assets/images/spinner.json'
import Lottie from './Lottie';

function LoadingOverlay() {
  const loading = useSelector((state) => state.aux.loading);

  return (
    <Fade in={loading} appear>
      <div
        className={classes.loadingOverlay}
        style={{ display: loading ? '' : 'none' }}
      >
        <Lottie data={spinner} size={90} />
      </div>
    </Fade>
  );
}

export default LoadingOverlay;
