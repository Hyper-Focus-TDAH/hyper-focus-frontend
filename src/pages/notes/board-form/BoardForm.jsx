import { useFormik } from 'formik';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { patchBoard, postBoard } from '../../../api/boardApi';
import TextField from '../../../components/text-field/TextField';
import { t } from '../../../i18n/translate';
import { auxActions } from '../../../store/aux/auxStore';

const BoardForm = forwardRef(({ onSubmit, initialState }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const dispatch = useDispatch();

  const initialValues = initialState
    ? {
        title: initialState.title ?? '',
        color: initialState.color ?? '#FFFFFF',
      }
    : {
        title: '',
        color: '#FFFFFF',
      };

  function validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = t('ERROR.REQUIRED');
    }

    if (!values.color) {
      errors.color = t('ERROR.REQUIRED');
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        const body = {
          title: values.title,
          color: values.color,
        };

        let response;

        if (initialState?.id) {
          response = await patchBoard(initialState.id, body);
        } else {
          response = await postBoard(body);
        }

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
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      className="d-flex flex-column align-items-stretch"
    >
      <h6>{t('TITLE')}</h6>
      <TextField
        id="title"
        intlKey="TITLE"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        isInvalid={formik.touched.title && formik.errors.title}
      />
      <h6>{t('COLOR')}</h6>
      <Form.Control
        type="color"
        id="color"
        name="color"
        title={t('CHOOSE_A_COLOR')}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.color}
        isInvalid={formik.touched.color && formik.errors.color}
      />
    </Form>
  );
});

export default BoardForm;
