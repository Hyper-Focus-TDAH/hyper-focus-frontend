import { forwardRef, useImperativeHandle } from 'react';

import { Button, Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import TextField from '../../components/TextField';
import { useT } from '../../i18n/translate';

const ChangePassword = forwardRef(
  ({ showSubmit, onSubmit, className }, ref) => {
    useImperativeHandle(ref, () => ({
      handleSubmit() {
        formik.handleSubmit();
      },
    }));

    const t = useT();

    function validate(values) {
      const errors = {};

      if (values.newPassword) {
        if (
          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/.test(
            values.newPassword
          )
        ) {
          errors.newPassword = t('ERROR.PASSWORD_REQUISITES');
        } else if (values.newPassword.length < 8) {
          errors.newPassword = t('ERROR.MINIMUM_X_CHARACTERS', { x: 8 });
        }

        if (!values.confirmNewPassword) {
          errors.confirmNewPassword = t('ERROR.REQUIRED');
        } else if (values.confirmNewPassword !== values.newPassword) {
          errors.confirmNewPassword = t('ERROR.PASSWORDS_DO_NOT_MATCH');
        }
      }

      if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/.test(
          values.password
        )
      ) {
        errors.password = t('ERROR.PASSWORD_REQUISITES');
      } else if (values.password.length < 8) {
        errors.password = t('ERROR.MINIMUM_X_CHARACTERS', { x: 8 });
      }

      return errors;
    }

    const formik = useFormik({
      initialValues: {
        newPassword: '',
        confirmNewPassword: '',
      },
      validate,
      onSubmit: (values) => {},
    });

    return (
      <Card className={className}>
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
              isInvalid={
                formik.touched.newPassword && formik.errors.newPassword
              }
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
  }
);

export default ChangePassword;
