import HTMLReactParser from 'html-react-parser';
import ForumPostVote from '../../posts/ForumPostVote';
import styles from './PostComment.module.css';

// {
//   username: 'nomeOutroUser',
//   message:
//     '<p>Eu sou uma mensagem de <strong>exemplo</strong>, apenas um comentario para exemplificar</p>',
//   datePosted: '1999-09-07',
//   dateEdited: '1999-09-07',
//   upvotes: 20,
//   downvotes: 2,
//   comments: [],
// },

function PostComment({ comment, style }) {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.comment}>
        <div className={styles.sidebar}>
          <div className={styles['profile-pic']}></div>
          <div className={styles.line} />
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <span>
              {comment.username} • {comment.datePosted} • {comment.dateEdited}
            </span>
          </div>
          <div className={styles.content}>
            {HTMLReactParser(comment.message)}
          </div>
          <div className={styles.actions}>
            <ForumPostVote isHorizontal upvotes={0} downvotes={0} />
            upvote 5 downvote reply share tip ...
          </div>
          <div className={styles.replies}>
            {!!comment.comments?.length &&
              comment.comments.map((comment) => (
                <PostComment comment={comment} />
              ))}
          </div>
        </div>
      </div>
      {/* {JSON.stringify(comment)} */}
    </div>
  );
}

export default PostComment;
