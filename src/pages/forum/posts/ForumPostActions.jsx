import { Button, ButtonGroup } from 'react-bootstrap';
import { t } from '../../../i18n/translate';
import styles from './ForumPostActions.module.css';

function ForumPostActions({ post }) {
  return (
    <ButtonGroup className={styles.actions}>
      <Button className={styles.actionButton}>
        {t('X_COMMENTS', { x: 5 })}
      </Button>
      <Button className={styles.actionButton}>{t('AWARD')}</Button>
      <Button className={styles.actionButton}>{t('SHARE')}</Button>
      <Button className={styles.actionButton}>{t('SAVE')}</Button>
      <Button className={styles.actionButton}>{'...'}</Button>
    </ButtonGroup>
  );
}

export default ForumPostActions;
