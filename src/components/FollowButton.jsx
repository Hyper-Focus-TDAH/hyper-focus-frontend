import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { t } from '../i18n/translate';
import styles from './FollowButton.module.css';

function FollowButton({ onClick, isActive }) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  if (isMobile) {
    return (
      <Button
        className={styles['mobile-button']}
        onClick={onClick}
        variant="outline-primary"
        active={isActive}
      >
        <BsPlus style={{ fontSize: '26px', color: 'primary' }} />
      </Button>
    );
  }

  return (
    <Button
      className={styles['desktop-button']}
      variant="outline-primary"
      type="button"
      onClick={onClick}
      active={isActive}
    >
      {!isActive && (
        <>
          <BsPlus style={{ fontSize: '20px', marginRight: '4px' }} />
          <span>{t('FOLLOW')}</span>
        </>
      )}
      {isActive && <span>{t('FOLLOWING')}</span>}
    </Button>
  );
}

export default FollowButton;
