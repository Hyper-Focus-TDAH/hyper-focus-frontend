import { toast } from 'react-hot-toast';

const defaultConfigs = {
  duration: 4000,
  position: 'bottom-center',
};

function error(message) {
  toast.error(message, defaultConfigs);
}

function success(message) {
  toast.success(message, defaultConfigs);
}

const notify = {
  success,
  error,
}

export default notify;
