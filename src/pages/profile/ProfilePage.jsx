import moment from 'moment';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { getPostsByUsername } from '../../api/postsApi';
import {
  followUserById,
  getFollowedUsers,
  getFollowingUsers,
  getUserByUsername,
} from '../../api/usersApi';
import ConfigButton from '../../components/buttons/config-button/ConfigButton';
import FollowButton from '../../components/buttons/follow-button/FollowButton';
import Dialog from '../../components/dialog/Dialog';
import Divider from '../../components/divider/Divider';
import EmptyState from '../../components/empty-state/EmptyState';
import ProfileChart from '../../components/profile-chart/ProfileChart';
import ProfileImage from '../../components/profile-image/ProfileImage';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import { formatPosts } from '../../services/postService';
import {
  ProfileChartTypes,
  UserSummaryDateTypes,
  UserSummaryValueTypes,
} from '../../services/userService';
import store from '../../store';
import { auxActions } from '../../store/aux-store/auxStore';
import { userActions } from '../../store/user-store/userStore';
import ForumPosts from '../forum/posts/ForumPosts';
import EditPictureForm from './EditPictureForm';
import styles from './ProfilePage.module.css';
import FriendsMenu from './friends/FriendsMenu';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUserData = useSelector((state) => state.user);
  const { username } = useParams();

  const {
    user: initialProfileUserData,
    posts: initialUserPosts,
    followingUsers: initialFollowingUsers,
    followedUsers: initialFollowedUsers,
  } = useLoaderData();
  const isLoggedUser = loggedUserData.id === initialProfileUserData.id;

  const editPictureForm = useRef(null);
  const [isEditPictureDialogOpen, setIsEditPictureDialogOpen] = useState(false);
  const [userPosts, setUserPosts] = useState(initialUserPosts);
  const [followingUsers, setFollowingUsers] = useState(initialFollowingUsers);
  const [followedUsers, setFollowedUsers] = useState(initialFollowingUsers);
  const [profileUserData, setProfileUserData] = useState(
    initialProfileUserData
  );
  const layoutRef = useRef(null);
  const [width, setWidth] = useState(0);
  const isMobile = width < 760;
  const isDrawerOpen = useSelector((state) => state.aux.isDrawerOpen);

  useLayoutEffect(() => {
    setWidth(layoutRef.current.offsetWidth);
  });

  useEffect(() => {
    function handleWindowResize() {
      setWidth(layoutRef.current.clientWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setWidth(layoutRef.current.offsetWidth);
  }, [isDrawerOpen]);

  const formattedUserPosts = formatPosts(userPosts);

  useEffect(() => {
    reloadUserData();
    reloadPosts();
    reloadFollowingUsers();
    reloadFollowedUsers();
  }, [username]);

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
      const posts = (await getPostsByUsername(username)).data;
      setUserPosts(posts);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function reloadUserData() {
    try {
      dispatch(auxActions.setLoading(true));
      const user = (await getUserByUsername(username)).data;
      setProfileUserData(user);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function reloadFollowingUsers() {
    try {
      dispatch(auxActions.setLoading(true));
      const followingUsers = (await getFollowingUsers(username)).data;
      setFollowingUsers(followingUsers);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function reloadFollowedUsers() {
    try {
      dispatch(auxActions.setLoading(true));
      const followedUsers = (await getFollowedUsers(username)).data;
      setFollowedUsers(followedUsers);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <Container ref={layoutRef} lassName="container-margin-bottom">
      <div
        className={`${styles['profile-header']} ${
          isMobile && styles['reduced-profile-header']
        }`}
      >
        <ProfileImage
          user={profileUserData}
          allowEdit={isLoggedUser}
          onClick={() => setIsEditPictureDialogOpen(true)}
        />
        <div className={`${styles.info} ${isMobile && styles['reduced-info']}`}>
          <span className="h1 m-0">{username}</span>
          <span className="h4 m-0 mb-2">{profileUserData.email}</span>
          <div
            className={`${styles.infoItem} ${
              isMobile && styles['reduced-infoItem']
            }`}
          >
            <BsClockFill size={22} />
            <span className="ms-1">
              {t('JOINED_X_AGO', {
                x: moment(profileUserData.createdAt).fromNow(true),
              })}
            </span>
          </div>
          <div
            className={`${styles.infoItem} ${
              isMobile && styles['reduced-infoItem']
            }`}
          >
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
          <ConfigButton
            onClick={() => navigate(RouteNames.CONFIG)}
            isMobile={isMobile}
          />
        )}
        {!isLoggedUser && (
          <FollowButton
            onClick={followUser}
            isActive={isFriend}
            isMobile={isMobile}
          />
        )}
      </div>
      <Divider style={{ marginBottom: '12px' }} />
      <div
        className={`${styles.content} ${isMobile && styles['reduced-content']}`}
      >
        <div className={styles['main-info']}>
          <div className="my-2">
            <span className="h3">{t('POSTS')}</span>
          </div>
          {!formattedUserPosts?.length && (
            <EmptyState
              message={t('EMPTY_STATE.PROFILE_POSTS', {
                username: username,
              })}
            />
          )}
          <ForumPosts
            posts={formattedUserPosts}
            onUpdate={async () => await reloadPosts()}
          />
        </div>
        <div
          className={`${styles['side-info']} ${
            isMobile && styles['reduced-side-info']
          }`}
        >
          <div className="my-2">
            <span className="h3">{t('CONNECTIONS')}</span>
          </div>
          <FriendsMenu
            followingUsers={followingUsers}
            followedUsers={followedUsers}
            previewLimit={3}
          />
          <div className="my-2 mt-4">
            <span className="h3">{t('STATISTICS')}</span>
          </div>
          <ProfileChart
            username={username}
            profileChartType={ProfileChartTypes.pieChart}
            dateType={UserSummaryDateTypes.YEAR}
            valueType={UserSummaryValueTypes.ALL}
          />
          <ProfileChart
            username={username}
            profileChartType={ProfileChartTypes.lineChart}
            dateType={UserSummaryDateTypes.DAY}
            valueType={UserSummaryValueTypes.NOTE}
          />
          <ProfileChart
            username={username}
            profileChartType={ProfileChartTypes.barChart}
            dateType={UserSummaryDateTypes.MONTH}
            valueType={UserSummaryValueTypes.TASK}
          />
          <ProfileChart
            username={username}
            profileChartType={ProfileChartTypes.lineChart}
            dateType={UserSummaryDateTypes.DAY}
            valueType={UserSummaryValueTypes.POST}
          />
          <ProfileChart
            username={username}
            profileChartType={ProfileChartTypes.barChart}
            dateType={UserSummaryDateTypes.MONTH}
            valueType={UserSummaryValueTypes.COMMENT}
          />
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
        <EditPictureForm
          ref={editPictureForm}
          onSubmit={async () => await reloadUserData()}
        />
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
    const followingUsers = (await getFollowingUsers(username)).data;
    const followedUsers = (await getFollowedUsers(username)).data;

    return { user, posts, followingUsers, followedUsers };
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }

  return [];
}
