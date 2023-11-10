import { Container } from 'react-bootstrap';
import adhdImage from '../../assets/images/ADHD.png';
import { t } from '../../i18n/translate';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <Container>
      HomePage
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.INTRODUCTION_ONE')}</span>
      </div>
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.INTRODUCTION_TWO')}</span>
      </div>
      <img className={styles.image} src={adhdImage} />
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.NOTES')}</span>
      </div>
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.TASKS')}</span>
      </div>
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.FORUM')}</span>
      </div>
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.CHAT')}</span>
      </div>
      <div className={styles.paragraph}>
        <span>{t('LANDING_PAGE.ADHD_TEST')}</span>
      </div>
    </Container>
  );
}

export default HomePage;
