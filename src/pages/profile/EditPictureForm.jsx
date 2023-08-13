import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getUserData, updateProfilePicture } from '../../api/usersApi';
import TextField from '../../components/TextField';
import { useT } from '../../i18n/translate';
import store from '../../store';
import { auxActions } from '../../store/auxStore';
import { userActions } from '../../store/userStore';

const EditPictureForm = forwardRef(({ onUpdate, initialState }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const t = useT();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  function validate(values) {
    const errors = {};

    if (!values.profilePicture) {
      errors.profilePicture = t('ERROR.REQUIRED');
    }

    return errors;
  }

  const initialValues = {
    profilePicture: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        const body = {
          image: file,
        };

        await updateProfilePicture(body);

        const response = await getUserData();

        store.dispatch(userActions.setUser(response.data));
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(auxActions.setLoading(false));
      }
    },
  });

  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      className="d-flex flex-column align-items-stretch"
    >
      <h6>{t('PROFILE_PICTURE')}</h6>
      <TextField
        id="profilePicture"
        name="profilePicture"
        intlKey="PROFILE_PICTURE"
        type="file"
        accept=".png"
        onChange={(event) => {
          setFile(event.currentTarget.files[0]);
          formik.handleChange(event);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.profilePicture}
        isInvalid={
          formik.touched.profilePicture && formik.errors.profilePicture
        }
      />
    </Form>
  );
});

export default EditPictureForm;
