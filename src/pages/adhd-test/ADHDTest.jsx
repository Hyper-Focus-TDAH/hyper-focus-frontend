import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { getTests } from '../../api/testApi';
import { t } from '../../i18n/translate';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
import ADHDTestForm from './adhd-test-form/ADHDTestForm';
import ADHDTestHistory from './adhd-test-history/ADHDTestHistory';

function ADHDTest() {
  const testsInitialState = useLoaderData();

  const [tests, setTests] = useState(testsInitialState);

  const isLastTestPositive = tests?.length
    ? tests[tests.length - 1].result
    : false;

  const [showTest, setShowTest] = useState(!tests.length);

  return (
    <Container className="container-margin-bottom">
      <Button onClick={() => setShowTest(true)}>{t('ADHD_TEST.START')}</Button>
      {!showTest && <ADHDTestHistory tests={tests} />}
      {showTest && <ADHDTestForm />}
    </Container>
  );
}

export default ADHDTest;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getTests();

    console.log(response);

    return response.data;
  } catch (e) {
    if (e?.status !== 404) {
      console.error(e);
    }
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
