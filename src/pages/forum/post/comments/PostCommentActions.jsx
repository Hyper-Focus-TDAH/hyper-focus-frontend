import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Dialog from '../../../../components/Dialog';
import { t } from '../../../../i18n/translate';
import ForumPostVote from '../../posts/ForumPostVote';
import Commentator from '../Commentator';
import styles from './PostCommentActions.module.css';

function PostCommentActions({ post, comment }) {
  const [showCommentatorDialog, setShowCommentatorDialog] = useState(false);

  return (
    <div className={styles.container}>
      <ForumPostVote
        isHorizontal
        upvotes={0}
        downvotes={0}
        className={styles.vote}
      />
      <ButtonGroup className={styles.actions}>
        <Button
          className={styles.actionButton}
          onClick={() => setShowCommentatorDialog(true)}
        >
          {t('REPLY')}
        </Button>
        <Button className={styles.actionButton}>{t('SHARE')}</Button>
        <Button className={styles.actionButton}>{t('TIP')}</Button>
        <Button className={styles.actionButton}>{'...'}</Button>
      </ButtonGroup>
      <Dialog
        show={showCommentatorDialog}
        onHide={() => setShowCommentatorDialog(false)}
        title={t('CREATE_TASK')}
        hideActions
        size="lg"
        centered
      >
        <Commentator
          post={post}
          comment={comment}
          onCancel={() => {
            setShowCommentatorDialog(false);
          }}
        />
      </Dialog>
    </div>
  );
}

export default PostCommentActions;
