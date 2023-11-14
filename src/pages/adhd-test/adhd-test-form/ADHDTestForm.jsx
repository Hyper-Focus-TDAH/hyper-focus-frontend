import { useFormik } from 'formik';
import { notify } from 'jquery';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postTest } from '../../../api/testApi';
import { t } from '../../../i18n/translate';
import { auxActions } from '../../../store/aux-store/auxStore';
import { testA, testB } from '../adhdTestConfig';
import styles from './ADHDTestForm.module.css';
import ADHDTestQuestion from './adhd-test-question/ADHDTestQuestion';

function ADHDTestForm({ onSubmit }) {
  const dispatch = useDispatch();

  function validate(values) {
    const isTestComplete = Object.keys(values).every((key) => !!values[key]);

    if (!isTestComplete) {
      notify.error(t('NOTIFY.ERROR.ALL_FIELDS_ARE_REQUIRED'));
    }

    return isTestComplete;
  }

  const formik = useFormik({
    initialValues: {
      A1: null,
      A2: null,
      A3: null,
      A4: null,
      A5: null,
      A6: null,
      B1: null,
      B2: null,
      B3: null,
      B4: null,
      B5: null,
      B6: null,
      B7: null,
      B8: null,
      B9: null,
      B10: null,
      B11: null,
      B12: null,
    },
    onSubmit: async (values) => {
      if (validate(values)) {
        const answerEnum = {
          1: 'Never',
          2: 'Rarely',
          3: 'Sometimes',
          4: 'Often',
          5: 'Very Often',
        };

        const body = { test_a: [], test_b: [] };

        Object.keys(values).forEach((key) => {
          const item = {
            answer: answerEnum[values[key][values[key].length - 1]],
          };
          key[0] === 'A' ? body.test_a.push(item) : body.test_b.push(item);
        });

        try {
          dispatch(auxActions.setLoading(true));

          await postTest(body);

          if (onSubmit) {
            onSubmit();
          }
        } catch (e) {
          console.error(e);
        } finally {
          dispatch(auxActions.setLoading(false));
        }
      }
    },
  });

  const canSubmit = Object.values(formik.values).every((val) => !!val);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <div className={styles['title-container']}>
        <span className="h2">{t('ADHD_TEST.QUESTIONS.A.TITLE')}</span>
      </div>
      {testA.map((item) => (
        <ADHDTestQuestion
          key={item.id}
          formik={formik}
          id={item.id}
          question={item.question}
        />
      ))}
      <div className={styles['title-container']}>
        <span className="h2">{t('ADHD_TEST.QUESTIONS.B.TITLE')}</span>
      </div>
      {testB.map((item) => (
        <ADHDTestQuestion
          key={item.id}
          formik={formik}
          id={item.id}
          question={item.question}
        />
      ))}
      <div className={styles['button-container']}>
        <Button className={styles.button} type="submit" disabled={!canSubmit}>
          {t('SUBMIT')}
        </Button>
      </div>
    </Form>
  );
}

export default ADHDTestForm;
