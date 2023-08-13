import { Button, ButtonGroup } from 'react-bootstrap';
import { t } from '../../../../i18n/translate';
import ForumPostVote from '../../posts/ForumPostVote';
import styles from './PostCommentActions.module.css';

function PostCommentActions({ onReply, upvotes, downvotes }) {
  return (
    <div className={styles.container}>
      <ForumPostVote
        isPostComment
        upvotes={upvotes}
        downvotes={downvotes}
        className={styles.vote}
      />
      <ButtonGroup className={styles.actions}>
        <Button className={styles.actionButton} onClick={onReply}>
          {t('REPLY')}
        </Button>
        <Button className={styles.actionButton}>{t('SHARE')}</Button>
        <Button className={styles.actionButton}>{t('TIP')}</Button>
        <Button className={styles.actionButton}>{'...'}</Button>
      </ButtonGroup>
    </div>
  );
}

export default PostCommentActions;
