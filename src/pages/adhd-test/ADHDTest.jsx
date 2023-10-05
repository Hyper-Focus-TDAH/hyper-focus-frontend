import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { getTests } from '../../api/testApi';
import { sortADHDTests } from '../../services/adhdTestsService';
import store from '../../store';
import { auxActions } from '../../store/aux-store/auxStore';
import ADHDTestForm from './adhd-test-form/ADHDTestForm';
import ADHDTestHistory from './adhd-test-history/ADHDTestHistory';

function ADHDTest() {
  const testsInitialState = useLoaderData();
  const dispatch = useDispatch();

  const [tests, setTests] = useState(testsInitialState);

  const isLastTestPositive = tests?.length
    ? tests[tests.length - 1].result
    : false;

  const [showTest, setShowTest] = useState(!tests.length);

  const orderedADHDTests = sortADHDTests(tests);

  async function reloadTests() {
    try {
      dispatch(auxActions.setLoading(true));

      const response = await getTests();

      setTests(response.data);
    } catch (e) {
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <Container className="container-margin-bottom">
      {!showTest && (
        <ADHDTestHistory
          tests={orderedADHDTests}
          onStartTest={() => setShowTest(true)}
        />
      )}
      {showTest && (
        <ADHDTestForm
          onSubmit={async () => {
            await reloadTests();
            setShowTest(false);
          }}
        />
      )}
    </Container>
  );
}

export default ADHDTest;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getTests();

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
