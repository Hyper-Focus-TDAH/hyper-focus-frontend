import { useState } from 'react';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import Dialog from '../../../../components/Dialog';
import IconButton from '../../../../components/IconButton';
import { t } from '../../../../i18n/translate';
import Commentator from '../Commentator';
import styles from './PostComment.module.css';
import PostCommentActions from './PostCommentActions';

function PostComment(props) {
  const [isExpanded, setIsExpanded] = useState(true);
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
            <span>
              {props.comment.userId} • {props.comment.created_at} •{' '}
              {props.comment.updated_at}
            </span>
          </div>
          {isExpanded && (
            <>
              <div className={styles.content}>
                {props.comment.content}
                {/* {HTMLReactParser(props.comment.message)} */}
              </div>
              <PostCommentActions
                onReply={() => setShowCommentatorDialog(true)}
              />
              <div className={styles.replies}>
                {!!props.comment.replies?.length &&
                  props.comment.replies.map((commentChild) => (
                    <PostComment
                      key={Math.random()}
                      {...props}
                      comment={commentChild}
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
