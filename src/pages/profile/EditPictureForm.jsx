import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getUserData, updateProfileImage } from '../../api/usersApi';
import TextField from '../../components/text-field/TextField';
import { useT } from '../../i18n/translate';
import store from '../../store';
import { auxActions } from '../../store/aux-store/auxStore';
import { userActions } from '../../store/user-store/userStore';

const EditPictureForm = forwardRef(({ onSubmit, initialState }, ref) => {
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

    if (!values.profileImage) {
      errors.profileImage = t('ERROR.REQUIRED');
    }

    return errors;
  }

  const initialValues = {
    profileImage: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        const body = {
          profile_image: file,
        };

        await updateProfileImage(body);

        const response = await getUserData();

        console.log('new user data', response.data);

        store.dispatch(userActions.setUser(response.data));

        if (onSubmit) {
          onSubmit();
        }
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
        id="profileImage"
        name="profileImage"
        intlKey="PROFILE_PICTURE"
        type="file"
        accept=".png, .jpeg, .jpg"
        onChange={(event) => {
          setFile(event.currentTarget.files[0]);
          formik.handleChange(event);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.profileImage}
        isInvalid={formik.touched.profileImage && formik.errors.profileImage}
      />
    </Form>
  );
});

export default EditPictureForm;
