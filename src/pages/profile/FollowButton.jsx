import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { followUserById } from '../../api/usersApi';
import { t } from '../../i18n/translate';
import { userActions } from '../../store/user/userStore';
import styles from './FollowButton.module.css';

function FollowButton({ userId }) {
  const dispatch = useDispatch();

  const loggedUserData = useSelector((state) => state.user);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const isFriend = !!loggedUserData.following.find((id) => id === userId);

  async function followUser(userId) {
    try {
      const response = await followUserById(userId);

      const updatedUser = response.data.user;

      if (updatedUser.id === loggedUserData.id) {
        dispatch(userActions.setUser(updatedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (isMobile) {
    return (
      <Button
        className={styles['mobile-button']}
        onClick={() => followUser(userId)}
        variant="outline-primary"
        active={isFriend}
      >
        <BsPlus style={{ fontSize: '26px', color: 'primary' }} />
      </Button>
    );
  }

  return (
    <Button
      className={styles['desktop-button']}
      variant="outline-primary"
      type="button"
      onClick={() => followUser(userId)}
      active={isFriend}
    >
      {!isFriend && (
        <>
          <BsPlus style={{ fontSize: '20px', marginRight: '4px' }} />
          <span>{t('FOLLOW')}</span>
        </>
      )}
      {isFriend && <span>{t('FOLLOWING')}</span>}
    </Button>
  );
}

export default FollowButton;
