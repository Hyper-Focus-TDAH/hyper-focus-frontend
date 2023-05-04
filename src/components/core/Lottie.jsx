import ReactLottie from "react-lottie";
import classes from './Lottie.module.css'

function Lottie({ data, size }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <ReactLottie className={classes.lottie} options={defaultOptions} height={size} width={size} />
    </div>
  );
}

export default Lottie;
