import { Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { t } from '../../../../../i18n/translate';
import styles from './ADHDTestInput.module.css';

function ADHDTestInput({ formik, id }) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <div
      key="inline-radio"
      className={styles[isMobile ? 'container-mobile' : 'container-desktop']}
    >
      <Form.Check
        id={`${id}-1`}
        name={id}
        type="radio"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={`${id}-1`}
        isInvalid={formik.touched[id] && formik.errors[id]}
        inline
        className={styles.radio}
        label={t('ADHD_TEST.ANSWERS.NEVER')}
      />
      <Form.Check
        id={`${id}-2`}
        name={id}
        type="radio"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={`${id}-2`}
        isInvalid={formik.touched[id] && formik.errors[id]}
        inline
        className={styles.radio}
        label={t('ADHD_TEST.ANSWERS.RARELY')}
      />
      <Form.Check
        id={`${id}-3`}
        name={id}
        type="radio"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={`${id}-3`}
        isInvalid={formik.touched[id] && formik.errors[id]}
        inline
        className={styles.radio}
        label={t('ADHD_TEST.ANSWERS.SOMETIMES')}
      />
      <Form.Check
        id={`${id}-4`}
        name={id}
        type="radio"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={`${id}-4`}
        isInvalid={formik.touched[id] && formik.errors[id]}
        inline
        className={styles.radio}
        label={t('ADHD_TEST.ANSWERS.FREQUENTLY')}
      />
      <Form.Check
        id={`${id}-5`}
        name={id}
        type="radio"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={`${id}-5`}
        isInvalid={formik.touched[id] && formik.errors[id]}
        inline
        className={styles.radio}
        label={t('ADHD_TEST.ANSWERS.VERY_FREQUENTLY')}
      />
    </div>
  );
}

export default ADHDTestInput;
