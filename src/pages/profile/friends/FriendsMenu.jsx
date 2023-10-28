import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Dialog from '../../../components/dialog/Dialog';
import { t } from '../../../i18n/translate';
import styles from './FriendsMenu.module.css';
import FriendsList from './friends-list/FriendsList';

function FriendsMenu({
  followingUsers = [],
  followedUsers = [],
  previewLimit = 4,
}) {
  const [isShowingHiddenFriends, setIsShowingHiddenFriends] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <Card className={styles.container}>
      <FriendsList
        buttonGroupKey={1}
        followingUsers={followingUsers}
        followedUsers={followedUsers}
        previewLimit={previewLimit}
        onShowMore={() => setIsShowingHiddenFriends(true)}
      />
      <Dialog
        show={isShowingHiddenFriends}
        style={{
          margin: !isMobile ? '10px' : '0px',
        }}
        title={t('FOLLOWING')}
        cancelLabel={t('CLOSE')}
        onCancel={() => setIsShowingHiddenFriends(false)}
      >
        <FriendsList
          buttonGroupKey={2}
          followingUsers={followingUsers}
          followedUsers={followedUsers}
          onChatClick={() => setIsShowingHiddenFriends(false)}
        />
      </Dialog>
    </Card>
  );
}

export default FriendsMenu;
