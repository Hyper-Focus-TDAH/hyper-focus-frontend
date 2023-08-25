import moment from 'moment';
import { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLoaderData } from 'react-router-dom';
import { getUserById } from '../../api/usersApi';
import Dialog from '../../components/Dialog';
import Divider from '../../components/Divider';
import ProfileImage from '../../components/ProfileImage';
import { t } from '../../i18n/translate';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
import ConfigButton from './ConfigButton';
import EditPictureForm from './EditPictureForm';
import FollowButton from './FollowButton';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const loggedUserId = useSelector((state) => state.user.id);
  const profileUserData = useLoaderData();
  const isLoggedUser = loggedUserId === profileUserData.id;

  const editPictureForm = useRef(null);
  const [isEditPictureDialogOpen, setIsEditPictureDialogOpen] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

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
                x: +profileUserData.following.length,
                y: +profileUserData.followers.length,
              })}
            </span>
          </div>
        </div>
        {isLoggedUser && <ConfigButton />}
        {!isLoggedUser && <FollowButton userId={profileUserData.id} />}
      </div>
      <Divider />
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

    const response = await getUserById(username);

    return response.data;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }

  return [];
}
