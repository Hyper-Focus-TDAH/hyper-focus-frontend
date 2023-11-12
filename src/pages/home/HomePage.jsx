import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/brain.png';
import templateImage from '../../assets/images/template.png';
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
        <img className={styles.image} src={templateImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.NOTES')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-2']}`}>
        <img className={styles.image} src={templateImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.TASKS')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-1']}`}>
        <img className={styles.image} src={templateImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.FORUM')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-2']}`}>
        <img className={styles.image} src={templateImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.CHAT')}</span>
        </div>
      </div>
      <div className={`${styles.section} ${styles['section-1']}`}>
        <img className={styles.image} src={templateImage} />
        <div className={styles.paragraph}>
          <span>{t('LANDING_PAGE.ADHD_TEST')}</span>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
