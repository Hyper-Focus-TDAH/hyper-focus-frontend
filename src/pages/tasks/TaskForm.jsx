import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import TextField from '../../components/TextField';
import { useT } from '../../i18n/translate';
import { createTask, editTask } from '../../services/api/tasks';
import { auxActions } from '../../store/auxStore';
import {
  formatBackendDateForForm,
  formatCalendarDateForBackend,
  formatFormTimeForBackend,
} from '../../utils';
import { TaskStatus } from './tasksConfig';

const TaskForm = forwardRef(({ onUpdate, initialState }, ref) => {
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      formik.handleSubmit();
    },
  }));

  const [isStartDate, setIsStartDate] = useState(!!initialState?.date?.start);
  const [isEndDate, setIsEndDate] = useState(!!initialState?.date?.end);

  const t = useT();
  const dispatch = useDispatch();

  function validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = t('ERROR.REQUIRED');
    }

    if (!values.startDate) {
      errors.startDate = t('ERROR.REQUIRED');
    }

    return errors;
  }

  const initialValues = initialState
    ? {
        title: initialState.title ?? '',
        description: initialState.description ?? '',
        startDate: formatBackendDateForForm(initialState.date?.start) ?? '',
        endDate: formatBackendDateForForm(initialState.date?.end) ?? '',
        startTime: initialState.time?.start ?? '',
        endTime: initialState.time?.end ?? '',
      }
    : {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
      };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        const task = {
          title: values.title,
          description: values.description === '' ? null : values.description,
          date: {
            start: formatCalendarDateForBackend(values.startDate),
            end: formatCalendarDateForBackend(values.endDate),
          },
          status: TaskStatus.TO_DO,
        };

        if (values.startTime || values.endTime) {
          task.time = {};
          task.time.start = formatFormTimeForBackend(values.startTime);
          task.time.end = formatFormTimeForBackend(values.endTime);
        }

        if (initialState?.id) {
          await editTask(initialState.id, task);
        } else {
          await createTask(task);
        }

        onUpdate();
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
      <h6>{t('DESCRIPTION')}</h6>
      <TextField
        id="description"
        as="textarea"
        intlKey="DESCRIPTION"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        isInvalid={formik.touched.description && formik.errors.description}
      />
      <div className="d-flex">
        <div className="flex-grow-1 me-2">
          <h6>{t('START_DATE')}</h6>
          <TextField
            id="startDate"
            type="date"
            intlKey="START_DATE"
            onBlur={formik.handleBlur}
            value={formik.values.startDate}
            isInvalid={formik.touched.startDate && formik.errors.startDate}
            onChange={(event) => {
              setIsStartDate(event.target.value && event.target.value !== '');
              formik.handleChange(event);
            }}
          />
        </div>
        <div className="flex-grow-1">
          <h6>{t('START_TIME')}</h6>
          <TextField
            id="startTime"
            type="time"
            intlKey="START_TIME"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startTime}
            isInvalid={formik.touched.startTime && formik.errors.startTime}
            disabled={!isStartDate}
          />
        </div>
      </div>
      <div className="d-flex">
        <div className="flex-grow-1 me-2">
          <h6>{t('END_DATE')}</h6>
          <TextField
            id="endDate"
            type="date"
            intlKey="END_DATE"
            onBlur={formik.handleBlur}
            value={formik.values.endDate}
            isInvalid={formik.touched.endDate && formik.errors.endDate}
            onChange={(event) => {
              setIsEndDate(event.target.value && event.target.value !== '');
              formik.handleChange(event);
            }}
          />
        </div>
        <div className="flex-grow-1">
          <h6>{t('END_TIME')}</h6>
          <TextField
            id="endTime"
            type="time"
            intlKey="END_TIME"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endTime}
            isInvalid={formik.touched.endTime && formik.errors.endTime}
            disabled={!isEndDate}
          />
        </div>
      </div>
    </Form>
  );
});

export default TaskForm;
