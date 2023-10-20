import moment from 'moment';
import { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getPostsByUsername } from '../../api/postsApi';
import {
  followUserById,
  getFollowingUsers,
  getUserByUsername,
} from '../../api/usersApi';
import ConfigButton from '../../components/buttons/config-button/ConfigButton';
import FollowButton from '../../components/buttons/follow-button/FollowButton';
import Dialog from '../../components/dialog/Dialog';
import Divider from '../../components/divider/Divider';
import EmptyState from '../../components/empty-state/EmptyState';
import ProfileImage from '../../components/profile-image/ProfileImage';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import { formatPosts } from '../../services/postService';
import store from '../../store';
import { auxActions } from '../../store/aux-store/auxStore';
import { userActions } from '../../store/user-store/userStore';
import ForumPosts from '../forum/posts/ForumPosts';
import EditPictureForm from './EditPictureForm';
import styles from './ProfilePage.module.css';
import FriendsList from './friends/FriendsList';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUserData = useSelector((state) => state.user);

  const {
    user: profileUserData,
    posts: initialUserPosts,
    friends,
  } = useLoaderData();
  const isLoggedUser = loggedUserData.id === profileUserData.id;

  const editPictureForm = useRef(null);
  const [isEditPictureDialogOpen, setIsEditPictureDialogOpen] = useState(false);
  const [userPosts, setUserPosts] = useState(initialUserPosts);

  const formattedUserPosts = formatPosts(userPosts);

  const isFriend = !!loggedUserData.following.find(
    (id) => id === profileUserData.id
  );

  async function followUser() {
    try {
      const response = await followUserById(profileUserData.id);
      const updatedUser = response.data.user;

      if (updatedUser.id === loggedUserData.id) {
        dispatch(userActions.setUser(updatedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function reloadPosts() {
    try {
      dispatch(auxActions.setLoading(true));
      const posts = (await getPostsByUsername(profileUserData.username)).data;
      setUserPosts(posts);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <Container className="container-margin-bottom">
      <div className={styles['profile-header']}>
        <ProfileImage
          user={profileUserData}
          allowEdit={isLoggedUser}
          onClick={() => setIsEditPictureDialogOpen(true)}
        />
        <div className={styles.info}>
          <span className="h1 m-0">{profileUserData.username}</span>
          <span className="h4 m-0 mb-2">{profileUserData.email}</span>
          <div className={styles.infoItem}>
            <BsClockFill size={22} />
            <span className="ms-1">
              {t('JOINED_X_AGO', {
                x: moment(profileUserData.createdAt).fromNow(true),
              })}
            </span>
          </div>
          <div className={styles.infoItem}>
            <BsPeopleFill size={22} />
            <span className="ms-1">
              {t('FOLLOWING_X_/_Y_FOLLOWERS', {
                x: profileUserData.following?.length ?? 0,
                y: profileUserData.followers?.length ?? 0,
              })}
            </span>
          </div>
        </div>
        {isLoggedUser && (
          <ConfigButton onClick={() => navigate(RouteNames.CONFIG)} />
        )}
        {!isLoggedUser && (
          <FollowButton onClick={followUser} isActive={isFriend} />
        )}
      </div>
      <Divider style={{ marginBottom: '12px' }} />
      <div className={styles.content}>
        <div className={styles['main-info']}>
          <div className="my-2">
            <span className="h3">{t('POSTS')}</span>
          </div>
          {!formattedUserPosts?.length && (
            <EmptyState
              message={t('EMPTY_STATE.PROFILE_POSTS', {
                username: profileUserData.username,
              })}
            />
          )}
          <ForumPosts
            posts={formattedUserPosts}
            onUpdate={async () => await reloadPosts()}
          />
        </div>
        <div className={styles['side-info']}>
          <div className="my-2">
            <span className="h3">{t('CONNECTIONS')}</span>
          </div>
          <FriendsList friends={friends} previewLimit={3} />
        </div>
      </div>
      <Dialog
        show={isEditPictureDialogOpen}
        onHide={() => setIsEditPictureDialogOpen(false)}
        title={t('CREATE_TASK')}
        cancelLabel={t('CANCEL')}
        onCancel={() => {
          setIsEditPictureDialogOpen(false);
        }}
        confirmLabel={t('SAVE')}
        onConfirm={() => {
          try {
            editPictureForm.current.handleSubmit();
            setIsEditPictureDialogOpen(false);
          } catch (e) {
            throw new Error(e);
          }
        }}
        size="lg"
        centered
      >
        <EditPictureForm ref={editPictureForm} />
      </Dialog>
    </Container>
  );
}

export default ProfilePage;

export async function loader({ params }) {
  const username = params.username;

  try {
    store.dispatch(auxActions.setLoading(true));

    const user = (await getUserByUsername(username)).data;
    const posts = (await getPostsByUsername(username)).data;
    const friends = (await getFollowingUsers()).data;

    return { user: user, posts: posts, friends: friends };
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }

  return [];
}
