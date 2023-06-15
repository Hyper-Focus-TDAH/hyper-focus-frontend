import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button, Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import { useT } from '../../i18n/translate';

import { useDispatch, useSelector } from 'react-redux';
import { LOCALES, backendLanguages, localesNames } from '../../i18n/locales';
import { updateUserData } from '../../services/api/users';
import { intlActions } from '../../store/intlStore';
import { userActions } from '../../store/userStore';

const ChangeLanguage = forwardRef(({ showSubmit, className }, ref) => {
  const localesKeys = Object.keys(localesNames);

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const t = useT();

  const [isFormChange, setIsFormChange] = useState(false);

  const initialValues = {
    languageSelector: useSelector((state) => state.intl.locale),
  };

  function validate(values) {
    setIsFormChange(JSON.stringify(initialValues) !== JSON.stringify(values));
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      if (isFormChange) {
        try {
          dispatch(intlActions.setLocale(values.languageSelector));

          const body = {
            language: backendLanguages[values.languageSelector],
          };

          const response = await updateUserData(body);

          dispatch(
            userActions.setUser({
              language: response.data.language,
            })
          );
        } catch (e) {
          throw Error(e);
        }
      }
    },
  });

  return (
    <Card className={className}>
      <Card.Header>
        <h5 className="my-2">{t('CHANGE_LANGUAGE')}</h5>
      </Card.Header>
      <Card.Body>
        <Form ref={ref} noValidate onSubmit={formik.handleSubmit}>
          <Form.Select
            id="languageSelector"
            name="languageSelector"
            placeholder={t('CHANGE_LANGUAGE')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.languageSelector}
            isInvalid={
              formik.touched.languageSelector && formik.errors.languageSelector
            }
          >
            {localesKeys.map((localeKey) => (
              <option key={localeKey} value={LOCALES[localeKey].KEY}>
                {localesNames[localeKey]}
              </option>
            ))}
          </Form.Select>
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

export default ChangeLanguage;
