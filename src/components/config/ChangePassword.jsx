import { forwardRef, useImperativeHandle } from 'react';

import { Card, Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import TextField from '../core/TextField';
import { useT } from '../../i18n/translate';

const ChangePassword = forwardRef(({ showSubmit, onSubmit }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const t = useT();

  function validate(values) {
    const errors = {};

    if (!values.newPassword) {
      errors.newPassword = t('ERROR.REQUIRED');
    } else if (values.newPassword.length < 6) {
      errors.newPassword = t('ERROR.MINIMUM_X_CHARACTERS', { x: 6 });
    }
  
    if (!values.confirmNewPassword) {
      errors.confirmNewPassword = t('ERROR.REQUIRED');
    } else if (values.confirmNewPassword !== values.newPassword) {
      errors.confirmNewPassword = t('ERROR.PASSWORDS_DO_NOT_MATCH');
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate,
    onSubmit: (values) => {
      onSubmit(values)
    },
  });

  return (
    <Card>
      <Card.Header>
        <h5 className="my-2">{t('CHANGE_PASSWORD')}</h5>
      </Card.Header>
      <Card.Body>
        <Form ref={ref} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="newPassword"
            type="password"
            label={t('NEW_PASSWORD')}
            intlKey={'NEW_PASSWORD'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            id="confirmNewPassword"
            type="password"
            label={t('CONFIRM_NEW_PASSWORD')}
            intlKey={'CONFIRM_NEW_PASSWORD'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmNewPassword}
            isInvalid={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
          />
          {showSubmit && (
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                {t('SUBMIT')}
              </Button>
            </Form.Group>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
});

export default ChangePassword;
