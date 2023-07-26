import HTMLReactParser from 'html-react-parser';
import { useState } from 'react';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import IconButton from '../../../../components/IconButton';
import styles from './PostComment.module.css';
import PostCommentActions from './PostCommentActions';

function PostComment({ comment, style }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.container} style={style}>
      <div className={styles.comment}>
        <div className={styles.sidebar}>
          <div className={styles['profile-pic-container']}>
            {!isExpanded && (
              <IconButton
                style={{
                  fontSize: '22px',
                  padding: '0px',
                  marginRight: '4px',
                }}
                icon={<BsArrowsAngleExpand />}
                onClick={() => setIsExpanded(true)}
              />
            )}
            <div className={styles['profile-pic']} />
          </div>
          {isExpanded && (
            <div
              className={styles['line-container']}
              onClick={() => setIsExpanded(false)}
            >
              <div className={styles.line} />
            </div>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <span>
              {comment.username} • {comment.datePosted} • {comment.dateEdited}
            </span>
          </div>
          {isExpanded && (
            <>
              <div className={styles.content}>
                {HTMLReactParser(comment.message)}
              </div>
              <PostCommentActions />
              <div className={styles.replies}>
                {!!comment.comments?.length &&
                  comment.comments.map((comment) => (
                    <PostComment key={Math.random()} comment={comment} />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostComment;
