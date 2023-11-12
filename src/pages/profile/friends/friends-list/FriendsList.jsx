import { useState } from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { BsChat } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../../components/buttons/icon-button/IconButton';
import Divider from '../../../../components/divider/Divider';
import ProfileImage from '../../../../components/profile-image/ProfileImage';
import { t } from '../../../../i18n/translate';
import RouteNames from '../../../../router/RouteNames';
import { chatActions } from '../../../../store/misc/chatStore';
import styles from './FriendsList.module.css';

const connectionTypes = {
  FOLLOWING: {
    VALUE: 'FOLLOWING',
    LABEL: t('FOLLOWING'),
  },
  FOLLOWERS: {
    VALUE: 'FOLLOWERS',
    LABEL: t('FOLLOWERS'),
  },
};

function FriendsList({
  buttonGroupKey = 0,
  followingUsers = [],
  followedUsers = [],
  previewLimit,
  onShowMore,
  onChatClick,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedConnectionType, setSelectedConnectionType] = useState(
    connectionTypes.FOLLOWING.VALUE
  );

  const friends =
    selectedConnectionType === connectionTypes.FOLLOWING.VALUE
      ? followingUsers
      : followedUsers;

  const previewFriends = previewLimit
    ? friends.slice(0, previewLimit)
    : friends;

  const isHiddenFriend = friends.length > previewFriends.length;

  function goToUserProfile(username) {
    navigate(`${RouteNames.PROFILE}/${username}`);
  }

  return (
    <div className={styles.container}>
      <ButtonGroup className={styles['button-group']}>
        {Object.keys(connectionTypes).map((key, idx) => {
          const connectionType = connectionTypes[key];
          return (
            <ToggleButton
              key={connectionType.VALUE}
              value={connectionType.VALUE}
              id={`radio-${buttonGroupKey}-${idx}`}
              type="radio"
              checked={selectedConnectionType === connectionType.VALUE}
              onChange={(e) => {
                setSelectedConnectionType(e.currentTarget.value);
              }}
            >
              {connectionType.LABEL}
            </ToggleButton>
          );
        })}
      </ButtonGroup>

      {previewFriends.map((friend) => (
        <div key={friend.id} className={styles.friend}>
          <ProfileImage user={friend} sizeInPixels={46} />
          <span
            className="clickable-text h5 pb-0 ms-2 mx-auto"
            onClick={() => goToUserProfile(friend.username)}
          >
            {friend.username}
          </span>
          <IconButton
            icon={<BsChat style={{ fontSize: '22px' }} />}
            onClick={() => {
              dispatch(
                chatActions.setIsOpen({ isOpen: true, selectedUser: friend })
              );

              if (onChatClick) {
                onChatClick();
              }
            }}
          />
        </div>
      ))}
      {isHiddenFriend && (
        <div className="mt-2">
          <Divider />

          <Button className="mt-2" onClick={onShowMore}>
            {t('VIEW_X_MORE', {
              x: friends.length - previewFriends.length,
            })}
          </Button>
        </div>
      )}
    </div>
  );
}

export default FriendsList;
