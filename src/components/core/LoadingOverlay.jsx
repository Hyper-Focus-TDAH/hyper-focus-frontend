import { Fade, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from './LoadingOverlay.module.css';
import spinner from '../../assets/images/spinner.json'
import Lottie from './Lottie';

function LoadingOverlay() {
  const isLoading = useSelector((state) => state.aux.isLoading);

  return (
    <Fade in={isLoading} appear>
      <div
        className={classes.loadingOverlay}
        style={{ display: isLoading ? '' : 'none' }}
      >
        <Lottie data={spinner} size={90} />
      </div>
    </Fade>
  );
}

export default LoadingOverlay;
