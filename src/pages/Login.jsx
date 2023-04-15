import {
  Button,
  Form,
  Card,
  Figure,
} from 'react-bootstrap'

import logo from "../assets/images/logo.png";

import { useSubmit } from "react-router-dom";
import { useFormik } from "formik";

import { t, useT } from '../i18n/translate'

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = t('ERROR.REQUIRED');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t('ERROR.INVALID_EMAIL_ADDRESS');;
  }

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
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      submit(values, {
        method: "post",
        action: "/login",
      });
    },
  });

  return (
    <Card>
      <Card.Header>
        <Figure>
          <Figure.Image src={logo} />
        </Figure>
      </Card.Header>
      <Card.Body>
        <Card.Title className="mb-3 text-center">{t('LOGIN')}</Card.Title>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="position-relative mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder={t('EMAIL')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {formik.touched.email && formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder={t('PASSWORD')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
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
  console.log("login action!", postData);
  return null;
}
