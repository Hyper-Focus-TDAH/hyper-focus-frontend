import { useState } from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../../i18n/translate';

import TextEditor from '../../../components/text-editor/TextEditor';

import { EditorState } from 'draft-js';
import { Button } from 'react-bootstrap';
import { postComment } from '../../../api/commentsApi';
import styles from './Commentator.module.css';

function Commentator({ post, comment, onCancel, onSubmit }) {
  const userData = useSelector((state) => state.user);
  const [commentMessage, setCommentMessage] = useState('');

  const [textEditorState, setTextEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  async function submitComment() {
    try {
      const body = {
        content: commentMessage.props.children,
      };

      let response;

      if (comment) {
        response = await postComment(post.id, comment.id, body);
      } else {
        response = await postComment(post.id, null, body);
      }

      setTextEditorState(EditorState.createEmpty());

      if (onSubmit) {
        onSubmit(response);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {t('COMMENT_AS', { username: userData.username })}
      <TextEditor
        editorState={textEditorState}
        onEditorStateChange={setTextEditorState}
        onChange={(msg) => setCommentMessage(msg)}
      />
      <div className={styles.buttonContainer}>
        {onCancel && (
          <Button
            className={styles.cancelButton}
            variant="outline-secondary"
            onClick={onCancel}
          >
            {t('CANCEL')}
          </Button>
        )}
        <Button onClick={submitComment}>{t('POST_COMMENT')}</Button>
      </div>
    </div>
  );
}

export default Commentator;
