import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { t } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import styles from './ForumPost.module.css';
import ForumPostVote from './post-vote/ForumPostVote';

function ForumPost({
  postId,
  upvotes,
  downvotes,
  community,
  user,
  title,
  description,
  createdAt,
  onClick,
  onUpdate,
}) {
  const navigate = useNavigate();

  function goToUserProfile(username) {
    navigate(`${RouteNames.PROFILE}/${username}`);
  }

  function goToCommunity(communityName) {
    console.log(communityName);
    navigate(`${RouteNames.FORUM}/${communityName}`);
  }

  return (
    <Card className={styles.post}>
      <ForumPostVote
        postId={postId}
        upvotes={upvotes}
        downvotes={downvotes}
        onUpdate={onUpdate}
      />
      <div className={styles.content}>
        <div className={styles.section}>
          {community?.name && (
            <>
              <span
                className="clickable-text me-1"
                onClick={() => goToCommunity(community.name)}
              >
                {community.name}
              </span>
              {` • `}
            </>
          )}
          {t('POSTED_BY')}
          <span
            className="clickable-text mx-1"
            onClick={() => goToUserProfile(user.username)}
          >
            {user.username}
          </span>
          {createdAt}
        </div>
        <div className={styles.body} onClick={onClick}>
          <span className="h4 mb-0">{title}</span>
          <span className="h6 pe-2">{description}</span>
        </div>
        {/* <div className={styles.section}>
          <ForumPostActions />
        </div> */}
      </div>
    </Card>
  );
}

export default ForumPost;
