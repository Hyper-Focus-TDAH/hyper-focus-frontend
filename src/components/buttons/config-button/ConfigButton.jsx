import { Button } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import { t } from '../../../i18n/translate';
import IconButton from '../icon-button/IconButton';
import styles from './ConfigButton.module.css';

function ConfigButton({ isMobile, onClick }) {
  if (isMobile) {
    return (
      <IconButton
        className={styles.button}
        icon={<BsGear style={{ fontSize: '20px', color: 'primary' }} />}
        onClick={onClick}
      />
    );
  }

  return (
    <Button
      className={styles.button}
      variant="outline-primary"
      type="button"
      onClick={onClick}
    >
      <BsGear style={{ fontSize: '20px', marginRight: '4px' }} />
      {t('CONFIGURATIONS')}
    </Button>
  );
}

export default ConfigButton;
