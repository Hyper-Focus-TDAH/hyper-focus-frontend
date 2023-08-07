import { Card } from 'react-bootstrap';
import { t } from '../../../i18n/translate';
import styles from './ForumPost.module.css';
import ForumPostActions from './ForumPostActions';
import ForumPostVote from './ForumPostVote';

function ForumPost({
  upvotes,
  downvotes,
  forum,
  user,
  title,
  description,
  onClick,
}) {
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
    <Card className={styles.post}>
      <ForumPostVote upvotes={upvotes} downvotes={downvotes} />
      <div className={styles.content} onClick={onClick}>
        <div className={styles.section}>
          {forum} • {t('POSTED_BY')} {user}
        </div>
        <div className={styles.body}>
          <span className="h4 mb-0">{title}</span>
          <span className="h6">{description}</span>
        </div>
        <div className={styles.section}>
          <ForumPostActions />
        </div>
      </div>
    </Card>
  );
}

export default ForumPost;
