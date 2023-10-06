import styles from './ADHDTestQuestion.module.css';
import ADHDTestInput from './ahdh-test-input/ADHDTestInput';

function ADHDTestQuestion({ id, question, formik }) {
  return (
    <div className={styles.container}>
      <div className={styles['title-container']}>
        <span className="h5 m-0">
          {id}. {question}
        </span>
      </div>
      <ADHDTestInput id={id} formik={formik} />
    </div>
  );
}

export default ADHDTestQuestion;
