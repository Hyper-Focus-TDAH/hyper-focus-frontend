import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../../api/postsApi';
import Dialog from '../../../../components/Dialog';
import OptionsButton from '../../../../components/buttons/OptionsButton';
import { t } from '../../../../i18n/translate';
import { auxActions } from '../../../../store/aux/auxStore';
import PostForm from '../../post/post-form/PostForm';
import styles from './ForumPostActions.module.css';

function ForumPostActions({ post, numComments, isLoggedUser, onUpdate }) {
  const dispatch = useDispatch();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

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

  async function handleDelete() {
    try {
      dispatch(auxActions.setLoading(true));

      await deletePost(post.id);

      setShowConfirmDeleteDialog(false);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <ButtonGroup className={styles.actions}>
      <Button className={styles.actionButton}>
        {numComments ? t('X_COMMENTS', { x: numComments }) : t('COMMENT')}
      </Button>
      {/* <Button className={styles.actionButton}>{t('AWARD')}</Button> */}
      <Button className={styles.actionButton}>{t('SHARE')}</Button>
      <Button className={styles.actionButton}>{t('SAVE')}</Button>
      {isLoggedUser && (
        <Button className={styles.actionButton} style={{ padding: '0' }}>
          {
            <OptionsButton
              buttonStyle={{
                width: '50px',
                height: '30px',
              }}
              icon={
                <BsThreeDots style={{ fontSize: '16px', color: 'black' }} />
              }
              options={options}
            />
          }
        </Button>
      )}
      <Dialog
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        title={t('EDIT_POST')}
        hideActions
        size="lg"
        centered
      >
        <PostForm
          onCancel={() => setShowEditDialog(false)}
          initialValues={post}
          onSubmit={async () => {
            if (onUpdate) {
              await onUpdate();
            }
            setShowEditDialog(false);
          }}
        />
      </Dialog>
      <Dialog
        show={showConfirmDeleteDialog}
        onHide={() => setShowConfirmDeleteDialog(false)}
        title={t('CONFIRM_DELETE_POST')}
        subtitle={t('THIS_ACTION_CANNOT_BE_UNDONE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowConfirmDeleteDialog(false)}
        confirmLabel={t('DELETE')}
        confirmColor="danger"
        onConfirm={handleDelete}
        escDismiss
        centered
      />
    </ButtonGroup>
  );
}

export default ForumPostActions;
