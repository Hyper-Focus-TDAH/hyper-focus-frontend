import { forwardRef, useImperativeHandle } from 'react';

import { Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import TextField from '../core/TextField';
import { useT } from '../../i18n/translate';

const ChangePassword = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    handleSubmit () {
      formik.handleSubmit();
    }
  }));

  const t = useT();

  function validate(values) {
    const errors = {};
    
    if (values.newPassword === values.oldPassword) {
      errors.newPassword = t('ERROR.NEW_PASSWORD_MUST_BE_DIFFERENT');
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validate,
    onSubmit: (values) => {
      console.log('submited', values);
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
            id="oldPassword"
            type="password"
            label={t('OLD_PASSWORD')}
            intlKey={'OLD_PASSWORD'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
          />
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
        </Form>
      </Card.Body>
    </Card>
  );
});

export default ChangePassword;
