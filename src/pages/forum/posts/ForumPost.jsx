import { Card } from 'react-bootstrap';
import { t } from '../../../i18n/translate';
import styles from './ForumPost.module.css';
import ForumPostActions from './post-actions/ForumPostActions';
import ForumPostVote from './post-vote/ForumPostVote';

function ForumPost({
  postId,
  upvotes,
  downvotes,
  forum,
  user,
  title,
  description,
  createdAt,
  onClick,
  onUpdate,
}) {
  return (
    <Card className={styles.post}>
      <ForumPostVote
        postId={postId}
        upvotes={upvotes}
        downvotes={downvotes}
        onUpdate={onUpdate}
      />
      <div className={styles.content} onClick={onClick}>
        <div className={styles.section}>
          {forum} • {t('POSTED_BY')} {user.username} {createdAt}
        </div>
        <div className={styles.body}>
          <span className="h4 mb-0">{title}</span>
          <span className="h6 pe-2">{description}</span>
        </div>
        <div className={styles.section}>
          <ForumPostActions />
        </div>
      </div>
    </Card>
  );
}

export default ForumPost;
