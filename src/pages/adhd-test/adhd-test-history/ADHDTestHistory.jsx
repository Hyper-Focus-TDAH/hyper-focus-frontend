import { Card } from 'react-bootstrap';
import { t } from '../../../i18n/translate';
import styles from './ADHDTestHistory.module.css';

function ADHDTestHistory({ tests = [] }) {
  return (
    <div styles={styles.container}>
      {tests.map((test) => (
        <Card className={styles.card}>
          <div className={styles.title}>
            <span className="h4">{t('ADHD_TEST.LABEL')}</span>{' '}
            <span className="h5">
              {/* {formatBackendDateForADHDTest(test.created_at)} */}
            </span>
          </div>
          <div className={styles['first-section']}>
            <span className="h5 py-1">{t('ADHD_TEST.RESULT.TITLE')}</span>
            {test.result ? (
              <span>
                {t('ADHD_TEST.RESULT.POSITIVE_LABEL')}:{' '}
                {t('ADHD_TEST.RESULT.POSITIVE_DESCRIPTION')}
              </span>
            ) : (
              <span>
                {t('ADHD_TEST.RESULT.NEGATIVE_LABEL')}:{' '}
                {t('ADHD_TEST.RESULT.NEGATIVE_DESCRIPTION')}
              </span>
            )}
          </div>
          <div className={styles['second-section']}>
            <span className="h5 pb-1 pt-3">{t('ADHD_TEST.SCORE')}</span>
            <span>
              {t('ADHD_TEST.QUESTIONS.A.TITLE')}: {test.score.test_a}
            </span>
            <span>
              {t('ADHD_TEST.QUESTIONS.B.TITLE')}: {test.score.test_b}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ADHDTestHistory;
