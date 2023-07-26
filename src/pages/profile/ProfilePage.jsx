import moment from 'moment';
import { useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import {
  BsClockFill,
  BsGear,
  BsPencilFill,
  BsPeopleFill,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Dialog from '../../components/Dialog';
import Divider from '../../components/Divider';
import IconButton from '../../components/IconButton';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import EditPictureForm from './EditPictureForm';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const editPictureForm = useRef(null);
  const [isEditPictureDialogOpen, setIsEditPictureDialogOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <Container className="container-margin-bottom">
      <div className={styles.container}>
        <div className={styles.pictureContainer}>
          <img
            className={styles.profilePicture}
            src={userData.profilePicture}
          />
          <IconButton
            className={styles.editPicture}
            icon={<BsPencilFill />}
            onClick={() => setIsEditPictureDialogOpen(true)}
          />
        </div>
        <div className={styles.info}>
          <span className="h1 m-0">{userData.username}</span>
          <span className="h4 m-0 mb-2">{userData.email}</span>
          <div className={styles.infoItem}>
            <BsClockFill size={22} />
            <span className="ms-1">
              {t('JOINED_X_AGO', {
                x: moment(userData.createdAt).fromNow(true),
              })}
            </span>
          </div>
          <div className={styles.infoItem}>
            <BsPeopleFill size={22} />
            <span className="ms-1">
              {t('FOLLOWING_X_/_Y_FOLLOWERS', { x: 0, y: 0 })}
            </span>
          </div>
        </div>
        {isMobile ? (
          <IconButton
            className={styles.config}
            icon={<BsGear style={{ fontSize: '20px', color: 'primary' }} />}
            onClick={() => navigate(RouteNames.CONFIG)}
          />
        ) : (
          <Button
            className={styles.config}
            variant="outline-primary"
            type="button"
            onClick={() => navigate(RouteNames.CONFIG)}
          >
            <BsGear style={{ fontSize: '20px', marginRight: '4px' }} />
            {t('CONFIGURATIONS')}
          </Button>
        )}
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

export async function loader() {
  return [];
}
