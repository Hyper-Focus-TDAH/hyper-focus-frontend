import { Button, Card } from 'react-bootstrap';
import { t } from '../../../i18n/translate';
import { formatDatabaseDateForADHDTest } from '../../../utils';
import styles from './ADHDTestHistory.module.css';

function ADHDTestHistory({ tests = [], onStartTest }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('ADHD_TEST.EXPLANATION.TITLE')}</h3>
      <span className="mb-3">{t('ADHD_TEST.EXPLANATION.PART_ONE')}</span>
      <span className="mb-3">{t('ADHD_TEST.EXPLANATION.PART_TWO')}</span>
      <Button
        onClick={() => {
          if (onStartTest) {
            onStartTest();
          }
        }}
      >
        {t('ADHD_TEST.START')}
      </Button>
      <h3 className={styles.title}>{t('ADHD_TEST.HISTORY')}</h3>
      {tests.map((test) => (
        <Card key={test.id} className={styles.card}>
          <div className={styles.title}>
            <span className="h4">{t('ADHD_TEST.LABEL')}</span>{' '}
            <span className="h5">
              {formatDatabaseDateForADHDTest(test.created_at)}
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
