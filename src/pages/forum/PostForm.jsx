import { EditorState } from 'draft-js';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postPost } from '../../api/postsApi';
import TextField from '../../components/TextField';
import TextEditor from '../../components/text-editor/TextEditor';
import { t } from '../../i18n/translate';
import { auxActions } from '../../store/aux/auxStore';
import styles from './PostForm.module.css';

function PostForm() {
  const dispatch = useDispatch();

  const [commentMessage, setCommentMessage] = useState('');

  const [textEditorState, setTextEditorState] = useState(() =>
    EditorState.createEmpty()
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
    initialValues: {
      title: '',
      postImage: null,
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(auxActions.setLoading(true));

        const body = {
          title: values.title,
          content: commentMessage.props.children,
          image: file,
        };

        await postPost(body);
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(auxActions.setLoading(false));
      }
    },
  });

  return (
    <Card className={styles.postBar}>
      <Card.Body>
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
            <Button className="mt-1 w-100" variant="primary" type="submit">
              {t('SUBMIT')}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PostForm;
