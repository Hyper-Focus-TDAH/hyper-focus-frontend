import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postCommunity, putCommunity } from '../../../api/communitiesApi';
import TextField from '../../../components/TextField';
import { t } from '../../../i18n/translate';
import { auxActions } from '../../../store/aux/auxStore';
import { commuActions } from '../../../store/misc/commuStore';

const CommunityForm = forwardRef(({ initialValues, onSubmit }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const dispatch = useDispatch();

  const _initialValues = {
    name: '',
    title: '',
    description: '',
    rules: '',
    category: '',
  };

  function validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = t('ERROR.REQUIRED');
    }

    if (!values.title) {
      errors.title = t('ERROR.REQUIRED');
    }

    if (!values.description) {
      errors.description = t('ERROR.REQUIRED');
    }

    if (!values.rules) {
      errors.rules = t('ERROR.REQUIRED');
    }

    if (!values.category) {
      errors.category = t('ERROR.REQUIRED');
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: initialValues ?? _initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        let response;
        if (values.id) {
          response = await putCommunity(values);
        } else {
          response = await postCommunity(values);
        }

        const community = response.data;

        dispatch(commuActions.addCommunity(community));

        if (onSubmit) {
          onSubmit(response);
        }
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(auxActions.setLoading(false));
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} ref={ref}>
      <TextField
        id="name"
        label={t('NAME')}
        intlKey={'NAME'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        isInvalid={formik.touched.name && formik.errors.name}
      />
      <TextField
        id="title"
        label={t('TITLE')}
        intlKey={'TITLE'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        isInvalid={formik.touched.title && formik.errors.title}
      />
      <TextField
        id="description"
        label={t('DESCRIPTION')}
        intlKey={'DESCRIPTION'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        isInvalid={formik.touched.description && formik.errors.description}
      />
      <TextField
        id="rules"
        label={t('RULES')}
        intlKey={'RULES'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rules}
        isInvalid={formik.touched.rules && formik.errors.rules}
      />
      <TextField
        id="category"
        label={t('CATEGORY')}
        intlKey={'CATEGORY'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category}
        isInvalid={formik.touched.category && formik.errors.category}
      />
    </Form>
  );
});

export default CommunityForm;
