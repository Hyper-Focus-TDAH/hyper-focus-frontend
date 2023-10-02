import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { patchPost, postPost } from '../../../../api/postsApi';
import TextEditor from '../../../../components/text-editor/TextEditor';
import TextField from '../../../../components/text-field/TextField';
import { t } from '../../../../i18n/translate';
import { auxActions } from '../../../../store/aux-store/auxStore';

function PostForm({ onSubmit, onCancel, initialValues, communityId }) {
  const dispatch = useDispatch();

  const [commentMessage, setCommentMessage] = useState('');

  const [textEditorState, setTextEditorState] = useState(() =>
    initialValues?.content
      ? EditorState.createWithContent(stateFromHTML(initialValues.content))
      : EditorState.createEmpty()
  );

  const [file, setFile] = useState(null);

  function validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = t('ERROR.REQUIRED');
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: initialValues ?? {
      title: '',
      postImage: null,
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        const body = {
          title: values.title,
          content: commentMessage,
          image: file,
        };

        let response;
        if (initialValues?.id) {
          response = await patchPost(initialValues?.id, body);
        } else {
          response = await postPost(body, communityId);
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
    <Form noValidate onSubmit={formik.handleSubmit}>
      <h6>{t('TITLE')}</h6>
      <TextField
        id="title"
        type="title"
        intlKey="TITLE"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        isInvalid={formik.touched.title && formik.errors.title}
      />
      <h6>{t('CONTENT')}</h6>
      <TextEditor
        editorState={textEditorState}
        onEditorStateChange={setTextEditorState}
        onChange={(msg) => setCommentMessage(msg)}
      />
      <h6 className="mt-3">{t('POST_IMAGE')}</h6>
      <TextField
        id="postImage"
        name="postImage"
        intlKey="POST_IMAGE"
        type="file"
        accept=".png, .jpeg, .jpg"
        onChange={(event) => {
          setFile(event.currentTarget.files[0]);
          formik.handleChange(event);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.postImage}
        isInvalid={formik.touched.postImage && formik.errors.postImage}
      />
      <Form.Group className="d-flex justify-content-center">
        {onCancel && (
          <Button
            className="mt-1 w-50 me-2"
            variant="outline-secondary"
            onClick={onCancel}
          >
            {t('CANCEL')}
          </Button>
        )}
        <Button
          className={`mt-1 ${onCancel ? 'w-50' : 'w-100'}`}
          variant="primary"
          type="submit"
        >
          {t('SUBMIT')}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default PostForm;
