import { Button, Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';
import { useNavigate, useSubmit } from 'react-router-dom';

import { t, useT } from '../i18n/translate';

import TextField from '../components/TextField';

import { redirect } from 'react-router-dom';
import { backendLanguages } from '../i18n/locales';
import RouteNames from '../router/RouteNames';
import { login } from '../services/api/auth';
import { getUserData } from '../services/api/users';
import store from '../store';
import { auxActions } from '../store/auxStore';
import { intlActions } from '../store/intlStore';
import { userActions } from '../store/userStore';
import notify from '../utils/notify';

function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = t('ERROR.REQUIRED');
  }

  return errors;
}

function Login() {
  const submit = useSubmit();
  const navigate = useNavigate();

  const t = useT();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      submit(values, {
        method: 'post',
        action: '/login',
      });
    },
  });

  return (
    <Card style={{ minWidth: '300px' }}>
      <Card.Body>
        <Card.Title className="mb-4 text-center">{t('LOGIN')}</Card.Title>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            type="username"
            intlKey={'NAME'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            isInvalid={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            type="password"
            intlKey={'PASSWORD'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Group className="d-flex justify-content-center">
            <Button className="mb-3 w-100" variant="primary" type="submit">
              {t('LOGIN')}
            </Button>
          </Form.Group>
          <Form.Group className="d-flex flex-column align-items-end">
            <Card.Link
              className="ms-0 mb-1"
              href="#"
              onClick={() => navigate(RouteNames.FORGOT_USERNAME)}
            >
              {t('FORGOT_YOUR_USERNAME?')}
            </Card.Link>
            <Card.Link
              className="ms-0 mb-1"
              href="#"
              onClick={() => navigate(RouteNames.FORGOT_PASSWORD)}
            >
              {t('FORGOT_YOUR_PASSWORD?')}
            </Card.Link>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;

export async function action({ request }) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    await login(body);

    const response = await getUserData();

    store.dispatch(userActions.setUser(response.data));

    const intl =
      Object.keys(backendLanguages).find(
        (key) => backendLanguages[key] === response.data.language
      ) ?? 'en';

    store.dispatch(intlActions.setLocale(intl));

    const username = store.getState().user.username;

    notify.success(t('NOTIFY.SUCCESS.LOGIN', { username: username }));
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    store.dispatch(auxActions.setLoading(false));
    return redirect(RouteNames.NOTES);
  }
}
