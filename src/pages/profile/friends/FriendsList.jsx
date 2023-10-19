import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsChat } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../components/buttons/icon-button/IconButton';
import Dialog from '../../../components/dialog/Dialog';
import Divider from '../../../components/divider/Divider';
import ProfileImage from '../../../components/profile-image/ProfileImage';
import { t } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import { chatActions } from '../../../store/misc/chatStore';
import styles from './FriendsList.module.css';

function FriendsList({ friends = [], previewLimit }) {
  const [isShowingHiddenFriends, setIsShowingHiddenFriends] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const previewFriends = previewLimit
    ? friends.slice(0, previewLimit)
    : friends;
  const isHiddenFriend = friends.length > previewFriends.length;

  function goToUserProfile(username) {
    navigate(`${RouteNames.PROFILE}/${username}`);
  }

  return (
    <Card className={styles.container}>
      <span className="h4 pb-0">{t('FOLLOWING')}</span>
      <Divider />
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
            }}
          />
        </div>
      ))}
      {isHiddenFriend && (
        <div className="mt-2">
          <Divider />
          <Button
            className="mt-2"
            onClick={() => setIsShowingHiddenFriends(true)}
          >
            {t('VIEW_X_MORE', {
              x: friends.length - previewFriends.length,
            })}
          </Button>
        </div>
      )}
      <Dialog
        show={isShowingHiddenFriends}
        style={{
          margin: !isMobile ? '10px' : '0px',
        }}
        title={t('FOLLOWING')}
        cancelLabel={t('CLOSE')}
        onCancel={() => setIsShowingHiddenFriends(false)}
      >
        <div className={styles['modal-container']}>
          {friends.map((friend) => (
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
                onClick={dispatch(
                  chatActions.setIsOpen({ isOpen: true, selectedUser: friend })
                )}
              />
            </div>
          ))}
        </div>
      </Dialog>
    </Card>
  );
}

export default FriendsList;
