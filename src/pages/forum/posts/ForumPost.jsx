import { useState } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';
import IconButton from '../../../components/IconButton';
import { t } from '../../../i18n/translate';
import styles from './ForumPost.module.css';

function ForumPost({ post }) {
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
    <Card className={styles.post}>
      <div className={styles.vote}>
        <IconButton
          style={{ fontSize: '22px', padding: '0px' }}
          icon={isUpvoted ? <BiSolidUpvote /> : <BiUpvote />}
          onClick={() => {
            setIsUpvoted(!isUpvoted);
            setIsDownvoted(false);
          }}
        />
        {+post.upvotes -
          +post.downvotes +
          (isDownvoted ? -1 : 0) +
          (isUpvoted ? +1 : 0)}
        <IconButton
          style={{ fontSize: '22px', padding: '0px' }}
          icon={isDownvoted ? <BiSolidDownvote /> : <BiDownvote />}
          onClick={() => {
            setIsDownvoted(!isDownvoted);
            setIsUpvoted(false);
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          {post.forum} • {t('POSTED_BY')} {post.user}
        </div>
        <div className={styles.body}>
          <span className="h4 mb-0">{post.title}</span>
          <span className="h6">{post.description}</span>
        </div>
        <div className={styles.section}>
          <ButtonGroup className={styles.actions}>
            <Button className={styles.actionButton}>
              {t('X_COMMENTS', { x: 5 })}
            </Button>
            <Button className={styles.actionButton}>{t('AWARD')}</Button>
            <Button className={styles.actionButton}>{t('SHARE')}</Button>
            <Button className={styles.actionButton}>{t('SAVE')}</Button>
            <Button className={styles.actionButton}>{t('...')}</Button>
          </ButtonGroup>
        </div>
      </div>
    </Card>
  );
}

export default ForumPost;
