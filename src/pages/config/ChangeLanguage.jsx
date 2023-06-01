import { forwardRef, useImperativeHandle } from 'react';

import { Card, Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import { useT } from '../../i18n/translate';

import { localesNames, LOCALES } from '../../i18n/locales';
import { useDispatch, useSelector } from 'react-redux';
import { intlActions } from '../../store/intl';

const ChangeLanguage = forwardRef(
  ({ showSubmit, className }, ref) => {
    const localesKeys = Object.keys(localesNames);

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      handleSubmit() {
        formik.handleSubmit();
      },
    }));

    const t = useT();

    const formik = useFormik({
      initialValues: {
        languageSelector: useSelector((state) => state.intl.locale),
      },
      onSubmit: (values) => {
        dispatch(intlActions.setLocale(values.languageSelector));
        // ToDo: persist user preference
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
                formik.touched.languageSelector &&
                formik.errors.languageSelector
              }
            >
              {localesKeys.map((localeKey) => (
                <option key={localeKey} value={LOCALES[localeKey].KEY}>{localesNames[localeKey]}</option>
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
  }
);

export default ChangeLanguage;
