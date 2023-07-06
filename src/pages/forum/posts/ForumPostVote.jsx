import { useState } from 'react';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';
import IconButton from '../../../components/IconButton';
import styles from './ForumPostVote.module.css';

function ForumPostVote({ upvotes, downvotes, isHorizontal }) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  return (
    <div
      className={`${styles.vote} `}
      style={{ flexDirection: isHorizontal ? 'row' : 'column' }}
    >
      <IconButton
        style={{ fontSize: '22px', padding: '0px' }}
        icon={isUpvoted ? <BiSolidUpvote /> : <BiUpvote />}
        onClick={() => {
          setIsUpvoted(!isUpvoted);
          setIsDownvoted(false);
        }}
      />
      {+upvotes - +downvotes + (isDownvoted ? -1 : 0) + (isUpvoted ? +1 : 0)}
      <IconButton
        style={{ fontSize: '22px', padding: '0px' }}
        icon={isDownvoted ? <BiSolidDownvote /> : <BiDownvote />}
        onClick={() => {
          setIsDownvoted(!isDownvoted);
          setIsUpvoted(false);
        }}
      />
    </div>
  );
}

export default ForumPostVote;
