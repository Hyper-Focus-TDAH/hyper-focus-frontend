import { useState } from 'react';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import Dialog from '../../../../components/Dialog';
import IconButton from '../../../../components/IconButton';
import { t } from '../../../../i18n/translate';
import Commentator from '../Commentator';
import styles from './PostComment.module.css';
import PostCommentActions from './PostCommentActions';

function PostComment({ level = 0, ...props }) {
  const [isExpanded, setIsExpanded] = useState(level === 0 || level % 3 !== 0);
  const [showCommentatorDialog, setShowCommentatorDialog] = useState(false);

  return (
    <div className={styles.container} style={props.style}>
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
            <span>{props.comment.userId}</span>
            <span className="mx-1"> • </span>
            <span>{props.comment.created_at}</span>
            {props.created_at !== props.updated_at && (
              <>
                <span className="mx-1"> • </span>
                <span>{props.comment.updated_at}</span>
              </>
            )}
          </div>
          {isExpanded && (
            <>
              <div className={styles.content}>{props.comment.content}</div>
              <PostCommentActions
                onReply={() => setShowCommentatorDialog(true)}
                post={props.post}
                comment={props.comment}
                upvotes={props.comment.reaction.like}
                downvotes={props.comment.reaction.dislike}
                onUpdate={props.onUpdate}
              />
              <div className={styles.replies}>
                {!!props.comment.replies?.length &&
                  props.comment.replies.map((commentChild) => (
                    <PostComment
                      key={Math.random()}
                      {...props}
                      level={level + 1}
                      comment={commentChild}
                      onUpdate={props.onUpdate}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Dialog
        show={showCommentatorDialog}
        onHide={() => setShowCommentatorDialog(false)}
        title={t('CREATE_TASK')}
        hideActions
        size="lg"
        centered
      >
        <Commentator
          post={props.post}
          comment={props.comment}
          onCancel={() => {
            setShowCommentatorDialog(false);
            props.onReply && props.onReply();
          }}
          onSubmit={() => {
            setShowCommentatorDialog(false);
            props.onReply && props.onReply();
          }}
        />
      </Dialog>
    </div>
  );
}

export default PostComment;
