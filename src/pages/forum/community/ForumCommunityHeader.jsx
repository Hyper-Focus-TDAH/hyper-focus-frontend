import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { followCommunityByCommunityId } from '../../../api/usersApi';
import FollowButton from '../../../components/FollowButton';
import styles from './ForumCommunityHeader.module.css';

function ForumCommunityHeader({ community, onUpdateCommunity }) {
  const loggedUserData = useSelector((state) => state.user);

  const isFollowing = !!community.followers.find(
    (id) => id === loggedUserData.id
  );

  async function followCommunity() {
    try {
      const response = await followCommunityByCommunityId(community.id);
      if (onUpdateCommunity) {
        onUpdateCommunity(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container className={styles.header}>
      <div className={styles.info}>
        <span className="h1 m-0">{community.title}</span>
        <span className="h4 m-0 mb-2">{community.name}</span>
      </div>
      <FollowButton onClick={followCommunity} isActive={isFollowing} />
    </Container>
  );
}

export default ForumCommunityHeader;
