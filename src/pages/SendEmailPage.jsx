import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/text-field/TextField';
import { t, useT } from '../i18n/translate';
import RouteNames from '../router/RouteNames';
import { auxActions } from '../store/aux-store/auxStore';

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = t('ERROR.REQUIRED');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t('ERROR.INVALID_EMAIL_ADDRESS');
  }

  return errors;
}

function SendEmailPage({ title, description, request }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useT();

  const isLoading = useSelector((state) => state.aux.isLoading);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        await request({ email: values.email });

        setIsRequestSent(true);
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(auxActions.setLoading(false));
      }
    },
  });

  return (
    <Card style={{ width: '300px' }}>
      {!isRequestSent && (
        <Card.Body>
          <Card.Title className="mb-3 text-center">{title}</Card.Title>
          <Card.Subtitle className="mb-3 text-center">
            {description}
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
              <Button
                className="mt-1 w-100"
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {t('SUBMIT')}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      )}
      {isRequestSent && (
        <Card.Body>
          <Card.Title className="mb-3 text-center">{t('DONE')}</Card.Title>
          <Card.Subtitle className="mb-3 text-center">
            {t('YOUR_EMAIL_WILL_ARRIVE_SHORTLY')}
          </Card.Subtitle>
          <Button
            className="mt-1 w-100"
            variant="primary"
            type="button"
            onClick={() => navigate(RouteNames.LOGIN)}
          >
            {t('GO_BACK')}
          </Button>
        </Card.Body>
      )}
    </Card>
  );
}

export default SendEmailPage;
