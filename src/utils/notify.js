import { toast } from 'react-hot-toast';

const defaultConfigs = {
  duration: 4000,
  position: 'bottom-center',
  // style: {
  //   textAlign: 'center'
  // }
};

function error(message) {
  const isMobile = window.innerWidth < 760;
  toast.error(message, {
    ...defaultConfigs,
    position: isMobile ? 'top-right' : 'bottom-center',
  });
}

function success(message) {
  const isMobile = window.innerWidth < 760;
  toast.success(message, {
    ...defaultConfigs,
    position: isMobile ? 'top-right' : 'bottom-center',
  });
}

const notify = {
  success,
  error,
};

export default notify;
