import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/brain.png';
import adhdTestImage from '../../assets/images/landing-page/adhd-test.png';
import notesImage from '../../assets/images/landing-page/notes.png';
import postsImage from '../../assets/images/landing-page/posts.png';
import profileImage from '../../assets/images/landing-page/profile.png';
import tasksImage from '../../assets/images/landing-page/tasks.png';
import Divider from '../../components/divider/Divider';
import { t } from '../../i18n/translate';
import RouteNames from '../../router/RouteNames';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <div className={styles['header-left']}>
          <h1>{t('LANDING_PAGE.TITLE')}</h1>
          <h5>{t('LANDING_PAGE.SUBTITLE')}</h5>
          <Button
            onClick={() => {
              navigate(RouteNames.REGISTER);
            }}
          >
            {t('REGISTER')}
          </Button>
        </div>
        <div className={styles['header-right']}>
          <img src={logoImage} />
          <div className={styles.text}>HYPER FOCUS</div>
        </div>
      </div>
      <Divider style={{ height: '50px', marginTop: '50px' }} />
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.INTRODUCTION_ONE')}</span>
      </div>
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.INTRODUCTION_TWO')}</span>
      </div>
      <div className={`${styles.section} ${styles['section-1']}`}>
        <img className={styles.image} src={notesImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.NOTES')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-2']}`}>
        <img className={styles.image} src={tasksImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.TASKS')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-1']}`}>
        <img className={styles.image} src={postsImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.FORUM')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-2']}`}>
        <img className={styles.image} src={profileImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.CHAT')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-1']}`}>
        <img className={styles.image} src={adhdTestImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.ADHD_TEST')}</span>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
