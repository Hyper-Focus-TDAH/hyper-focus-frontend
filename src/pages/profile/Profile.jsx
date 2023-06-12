import { Button } from 'react-bootstrap';
import {
  BsClockFill,
  BsGear,
  BsPeopleFill,
  BsPersonFill,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Divider from '../../components/Divider';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import styles from './Profile.module.css';

function Profile() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pic}>
          <BsPersonFill size={140} />
        </div>
        {/* {userData.id ?? 'id'} <br /> */}
        <div className={styles.info}>
          <span className="h1 m-0">{userData.username}</span>
          <span className="h4 m-0 mb-2">{userData.email}</span>
          <div className={styles.infoItem}>
            <BsClockFill size={22} />
            <span className="ms-1">Joined on</span>
          </div>
          <div className={styles.infoItem}>
            <BsPeopleFill size={22} />
            <span className="ms-1">Following X / Y Followers</span>
          </div>
        </div>
        <Button
          className={styles.config}
          variant="outline-primary"
          type="button"
          onClick={() => navigate(RouteNames.CONFIG)}
        >
          <BsGear style={{ fontSize: '20px', marginRight: '4px' }} />{' '}
          {t('CONFIGURATIONS')}
        </Button>
        {/* {userData.birthdate ?? 'birthdate'} <br /> */}
        {/* {userData.gender ?? 'gender'} <br /> */}
        {/* {userData.language ?? 'language'} <br /> */}
        {/* {userData.nationality ?? 'nationality'} <br /> */}
      </div>
      <Divider />
    </>
  );
}

export default Profile;

export async function loader() {
  return [];
}
