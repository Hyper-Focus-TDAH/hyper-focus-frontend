import { useEffect, useState } from 'react';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../../../components/Dialog';
import IconButton from '../../../../components/IconButton';
import ProfileImage from '../../../../components/ProfileImage';
import { t } from '../../../../i18n/translate';
import { postActions } from '../../../../store/misc/postStore';
import Commentator from '../Commentator';
import styles from './PostComment.module.css';
import PostCommentActions from './PostCommentActions';

function PostComment({ level = 0, ...props }) {
  const _isExpanded = useSelector(
    (state) => state.post.commentsOpen[props.comment.id]
  );

  const [isExpanded, setIsExpanded] = useState(
    _isExpanded ?? (level === 0 || level % 3 !== 0)
  );
  const [showCommentatorDialog, setShowCommentatorDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      postActions.setCommentsOpen({
        commentId: props.comment.id,
        isOpen: _isExpanded ?? (level === 0 || level % 3 !== 0),
      })
    );
  }, []);

  function handleIsExpandedChange(isExpanded) {
    setIsExpanded(isExpanded);

    dispatch(
      postActions.setCommentsOpen({
        commentId: props.comment.id,
        isOpen: isExpanded,
      })
    );
  }

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
                onClick={() => handleIsExpandedChange(true)}
              />
            )}
            <ProfileImage
              image={props.comment.user.profile_image}
              style={{ width: '36px', height: '36px' }}
            />
          </div>

          {isExpanded && (
            <div
              className={styles['line-container']}
              onClick={() => handleIsExpandedChange(false)}
            >
              <div className={styles.line} />
            </div>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <span>{props.comment.user.username}</span>
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
