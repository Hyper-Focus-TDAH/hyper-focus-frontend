import moment from 'moment';
import { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getPostsByUsername } from '../../api/postsApi';
import { followUserById, getUserByUsername } from '../../api/usersApi';
import Dialog from '../../components/Dialog';
import Divider from '../../components/Divider';
import EmptyState from '../../components/EmptyState';
import ProfileImage from '../../components/ProfileImage';
import ConfigButton from '../../components/buttons/ConfigButton';
import FollowButton from '../../components/buttons/FollowButton';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import { formatPosts } from '../../services/postService';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
import { userActions } from '../../store/user/userStore';
import ForumPosts from '../forum/posts/ForumPosts';
import EditPictureForm from './EditPictureForm';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUserData = useSelector((state) => state.user);

  const { user: profileUserData, posts: userPosts } = useLoaderData();
  const isLoggedUser = loggedUserData.id === profileUserData.id;

  const editPictureForm = useRef(null);
  const [isEditPictureDialogOpen, setIsEditPictureDialogOpen] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

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

  return (
    <Container className="container-margin-bottom">
      <div className={styles.container}>
        <ProfileImage
          user={profileUserData}
          allowEdit={isLoggedUser}
          onClick={() => setIsEditPictureDialogOpen(true)}
        />
        <div
          className={styles.info}
          style={{ textAlign: isMobile ? 'center' : 'left' }}
        >
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
      <Divider />
      <h2 className="mt-4 ms-1">{t('POSTS')}</h2>
      {!formattedUserPosts?.length && (
        <EmptyState
          message={t('EMPTY_STATE.PROFILE_POSTS', {
            username: profileUserData.username,
          })}
        />
      )}
      <ForumPosts posts={formattedUserPosts} />
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

    return { user: user, posts: posts };
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }

  return [];
}
