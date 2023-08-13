import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button, Card, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import { useT } from '../../i18n/translate';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../api/usersApi';
import TextField from '../../components/TextField';
import { userActions } from '../../store/userStore';
import {
  formatBackendDateForForm2,
  formatCalendarDateForBackend,
} from '../../utils';
import notify from '../../utils/notify';

const genders = {
  I_PREFER_NOT_TO_DECLARE: null,
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

const ChangeUserInformation = forwardRef(({ showSubmit, className }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const { birthdate, gender, nationality } = useSelector((state) => state.user);

  const [isFormChange, setIsFormChange] = useState(false);

  const t = useT();

  const dispatch = useDispatch();

  const initialValues = {
    birthdate: birthdate ?? '',
    gender: Object.keys(genders).find((key) => genders[key] === gender) ?? '',
    nationality: nationality ?? '',
  };

  function validate(values) {
    setIsFormChange(JSON.stringify(initialValues) !== JSON.stringify(values));

    const errors = {};

    return errors;
  }

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      if (isFormChange) {
        try {
          const body = {
            birthdate: formatCalendarDateForBackend(values.birthdate),
            gender: genders[values.gender],
            nationality: values.nationality,
          };

          const response = await updateUserData(body);

          dispatch(
            userActions.setUser({
              birthdate: formatBackendDateForForm2(response.data.birthdate),
              gender: response.data.gender,
              nationality: response.data.nationality,
            })
          );

          notify.success(t('NOTIFY.SUCCESS.USER_INFORMATION_CHANGED'));
        } catch (e) {
          throw Error(e);
        }
      }
    },
  });

  return (
    <Card className={className}>
      <Card.Header>
        <h5 className="my-2">{t('CHANGE_USER_INFO')}</h5>
      </Card.Header>
      <Card.Body>
        <Form ref={ref} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            id="nationality"
            type="text"
            label={t('NATIONALITY')}
            intlKey={'NATIONALITY'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nationality}
            isInvalid={formik.touched.nationality && formik.errors.nationality}
          />
          <TextField
            id="birthdate"
            type="date"
            label={t('BIRTH_DATE')}
            intlKey="BIRTH_DATE"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
            isInvalid={formik.touched.birthdate && formik.errors.birthdate}
          />
          <Form.Label column>{t('GENDER')}</Form.Label>
          <Form.Select
            id="gender"
            name="gender"
            placeholder={t('GENDER')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            isInvalid={formik.touched.gender && formik.errors.gender}
          >
            {Object.keys(genders).map((gender) => (
              <option key={gender} value={gender}>
                {t(gender)}
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

export default ChangeUserInformation;
