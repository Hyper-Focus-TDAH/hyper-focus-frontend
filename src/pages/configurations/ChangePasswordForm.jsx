import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button, Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import { useSelector } from 'react-redux';
import { passwordChange, updateUserData } from '../../api/usersApi';
import TextField from '../../components/text-field/TextField';
import { useT } from '../../i18n/translate';
import notify from '../../utils/notify';

const ChangePasswordForm = forwardRef(
  ({ showSubmit, className, passwordRecoveryToken }, ref) => {
    useImperativeHandle(ref, () => ({
      handleSubmit() {
        formik.handleSubmit();
      },
    }));

    const t = useT();
    const isLogged = useSelector((state) => state.auth.isAuthenticated);
    const [isFormChange, setIsFormChange] = useState(false);

    const initialValues = {
      newPassword: '',
      confirmNewPassword: '',
    };

    function validate(values) {
      setIsFormChange(JSON.stringify(initialValues) !== JSON.stringify(values));

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

      return errors;
    }

    const formik = useFormik({
      initialValues,
      validate,
      onSubmit: async (values) => {
        if (isFormChange) {
          try {
            if (isLogged) {
              await updateUserData({
                password: values.newPassword,
              });
            } else if (passwordRecoveryToken) {
              await passwordChange({
                password: values.newPassword,
                passwordRecoveryToken: passwordRecoveryToken,
              });
            }

            notify.success(t('NOTIFY.SUCCESS.PASSWORD_CHANGED'));
          } catch (e) {
            throw Error(e);
          }
        }
      },
    });

    return (
      <Card className={className}>
        <Card.Header>
          <h5 className="my-2">{t('CHANGE_PASSWORD')}</h5>
        </Card.Header>
        <Card.Body>
          <Form ref={ref} noValidate onSubmit={formik.handleSubmit}>
            <Form.Label column>{t('NEW_PASSWORD')}</Form.Label>
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
            <Form.Label column>{t('CONFIRM_NEW_PASSWORD')}</Form.Label>

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
              className="mb-0"
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

export default ChangePasswordForm;
