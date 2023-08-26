import { Button, ButtonGroup } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import OptionsButton from '../../../../components/OptionsButton';
import { t } from '../../../../i18n/translate';
import styles from './ForumPostActions.module.css';

function ForumPostActions({ numComments }) {
  const options = [
    {
      id: 'edit',
      content: 'Edit',
      onClick: () => setShowEditDialog(true),
    },
    {
      id: 'delete',
      content: 'Delete',
      onClick: () => setShowConfirmDeleteDialog(true),
    },
  ];

  return (
    <ButtonGroup className={styles.actions}>
      <Button className={styles.actionButton}>
        {numComments ? t('X_COMMENTS', { x: numComments }) : t('COMMENT')}
      </Button>
      {/* <Button className={styles.actionButton}>{t('AWARD')}</Button> */}
      <Button className={styles.actionButton}>{t('SHARE')}</Button>
      <Button className={styles.actionButton}>{t('SAVE')}</Button>
      <Button className={styles.actionButton} style={{ padding: '0' }}>
        {
          <OptionsButton
            buttonStyle={{
              width: '50px',
              height: '30px',
            }}
            icon={<BsThreeDots style={{ fontSize: '16px', color: 'black' }} />}
            options={options}
          />
        }
      </Button>
    </ButtonGroup>
  );
}

export default ForumPostActions;
