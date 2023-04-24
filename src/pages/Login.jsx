import { Button, Form, Card, Figure } from 'react-bootstrap';

import logo from '../assets/images/logo.png';

import { useSubmit } from 'react-router-dom';
import { useFormik } from 'formik';

import { t, useT } from '../i18n/translate';

import api from '../utils/api';
import TextField from '../components/core/TextField';

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = t('ERROR.REQUIRED');
  }

  return errors;
};

function Login() {
  const submit = useSubmit();

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
    <Card>
      <Card.Body>
        <Card.Title className="mb-3 text-center">{t('LOGIN')}</Card.Title>
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
            <Button variant="primary" type="submit">
              {t('LOGIN')}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log('login action!', postData);
  try {
    const response = await api.post('/api/v1/auth/login', {
      username: postData.username,
      password: postData.password,
    });
    console.log('response', response);
  } catch (e) {
    console.error(e);
  }
  return null;
}
