import { Card, Form, Button } from 'react-bootstrap';
import TextField from '../components/core/TextField';
import { useFormik } from 'formik';
import { t, useT } from '../i18n/translate';
import { recoverUsername } from '../services/api/mailer';

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = t('ERROR.REQUIRED');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t('ERROR.INVALID_EMAIL_ADDRESS');
  }

  return errors;
}

function ForgotUsername() {
  const t = useT();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      await recoverUsername({ email: values.email });
    },
  });

  return (
    <Card style={{ width: '300px' }}>
      <Card.Body>
        <Card.Title className="mb-3 text-center">
          {t('FORGOT_USERNAME')}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-center">
          {t('FORGOT_USERNAME_DESCRIPTION')}
        </Card.Subtitle>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            type="email"
            intlKey="EMAIL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Group className="d-flex justify-content-center">
            <Button className="mt-1 w-100" variant="primary" type="submit">
              {t('SUBMIT')}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ForgotUsername;
