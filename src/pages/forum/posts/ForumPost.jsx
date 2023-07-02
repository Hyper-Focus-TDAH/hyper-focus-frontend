import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { t } from '../../../i18n/translate';
import styles from './ForumPost.module.css';
import ForumPostActions from './ForumPostActions';
import ForumPostVote from './ForumPostVote';

function ForumPost({ post, onClick }) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  // forum: 'f/nomeDoForum',
  // user: 'u/nomeDoUser',
  // date: '1999-09-07',
  // title: 'Titulo teste do post',
  // description: 'Descricao teste do post post post post post post post ',
  // tags: ['tag1', 'tag2', 'tag3'],
  // upvotes: 30,
  // downvotes: 5,
  // isSaved: false,

  return (
    <Card className={styles.post} onClick={onClick}>
      <ForumPostVote post={post} />
      <div className={styles.content}>
        <div className={styles.section}>
          {post.forum} • {t('POSTED_BY')} {post.user}
        </div>
        <div className={styles.body}>
          <span className="h4 mb-0">{post.title}</span>
          <span className="h6">{post.description}</span>
        </div>
        <div className={styles.section}>
          <ForumPostActions />
        </div>
      </div>
    </Card>
  );
}

export default ForumPost;
