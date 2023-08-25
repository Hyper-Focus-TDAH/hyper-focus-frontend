import { Button } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import styles from './ConfigButton.module.css';

function ConfigButton({}) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <IconButton
        className={styles.button}
        icon={<BsGear style={{ fontSize: '20px', color: 'primary' }} />}
        onClick={() => navigate(RouteNames.CONFIG)}
      />
    );
  }

  return (
    <Button
      className={styles.button}
      variant="outline-primary"
      type="button"
      onClick={() => navigate(RouteNames.CONFIG)}
    >
      <BsGear style={{ fontSize: '20px', marginRight: '4px' }} />
      {t('CONFIGURATIONS')}
    </Button>
  );
}

export default ConfigButton;
