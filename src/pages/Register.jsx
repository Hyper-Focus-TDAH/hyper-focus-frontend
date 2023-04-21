import { Button, Form, Card, Figure } from 'react-bootstrap';

import logo from '../assets/images/logo.png';
import { useSubmit } from 'react-router-dom';
import { useFormik } from 'formik';

import { t, useT } from '../i18n/translate';

import api from '../utils/api';
import TextField from '../components/core/TextField';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = t('ERROR.REQUIRED');
  } else if (values.name.length > 15) {
    errors.name = t('ERROR.MAXIMUM_X_CHARACTERS', { x: 15 });
  }

  if (!values.email) {
    errors.email = t('ERROR.REQUIRED');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t('ERROR.INVALID_EMAIL_ADDRESS');
  }

  if (!values.password) {
    errors.password = t('ERROR.REQUIRED');
  } else if (values.password.length < 6) {
    errors.password = t('ERROR.MINIMUM_X_CHARACTERS', { x: 6 });
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
      name: '',
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
    <Card>
      <Card.Body>
        <Card.Title className="mb-4 text-center">{t('REGISTER')}</Card.Title>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            type="name"
            intlKey="NAME"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isInvalid={formik.touched.name && formik.errors.name}
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
            <Button variant="primary" type="submit">
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
  const postData = Object.fromEntries(formData);
  console.log('register action!', postData);
  try {
    const response = await api.post('auth/signup', {
      userName: postData.name,
      password: postData.password,
      email: postData.email,
    });
  } catch (e) {
    console.error(e);
  }

  return null;
}
