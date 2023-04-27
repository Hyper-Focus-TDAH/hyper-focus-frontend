import { Button, Form, Card, Figure } from 'react-bootstrap';

import logo from '../assets/images/logo.png';
import { redirect, useSubmit } from 'react-router-dom';
import { useFormik } from 'formik';

import { t, useT } from '../i18n/translate';

import api from '../utils/api';
import TextField from '../components/core/TextField';
import RouteNames from '../router/RouteNames';
import { register } from '../services/api/auth';

function validate (values) {
  const errors = {};

  if (!values.username) {
    errors.username = t('ERROR.REQUIRED');
  } else if (values.username.length > 15) {
    errors.username = t('ERROR.MAXIMUM_X_CHARACTERS', { x: 15 });
  }

  if (!values.email) {
    errors.email = t('ERROR.REQUIRED');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t('ERROR.INVALID_EMAIL_ADDRESS');
  }

  if (!values.password) {
    errors.password = t('ERROR.REQUIRED');
  } else if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/.test(values.password))) {
    errors.password = t('ERROR.PASSWORD_REQUISITES');
  } else if (values.password.length < 8) {
    errors.password = t('ERROR.MINIMUM_X_CHARACTERS', { x: 8 });
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = t('ERROR.REQUIRED');
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = t('ERROR.PASSWORDS_DO_NOT_MATCH');
  }

  return errors;
};

function Register() {
  const submit = useSubmit();

  const t = useT();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values) => {
      submit(values, {
        method: 'post',
        action: '/register',
      });
    },
  });

  return (
    <Card style={{minWidth: '300px'}}>
      <Card.Body>
        <Card.Title className="mb-4 text-center">{t('REGISTER')}</Card.Title>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            type="username"
            intlKey="NAME"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            isInvalid={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="email"
            type="email"
            intlKey="EMAIL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            type="password"
            intlKey="PASSWORD"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="confirmPassword"
            type="password"
            intlKey="CONFIRM_PASSWORD"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Form.Group className="d-flex justify-content-center">
            <Button className="mb-3 w-100" variant="primary" type="submit">
              {t('REGISTER')}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;

export async function action({ request }) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  try {
    await register(body);
  } catch (e) {
    return null;
  } finally {
    return redirect(RouteNames.NOTES);
  }
}
