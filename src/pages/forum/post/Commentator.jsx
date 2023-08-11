import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../../i18n/translate';
import { postComment } from '../../../services/api/commentsApi';

import TextEditor from '../../../components/text-editor/TextEditor';

import { Button } from 'react-bootstrap';
import styles from './Commentator.module.css';

function Commentator({ post, comment, onCancel }) {
  const userData = useSelector((state) => state.user);
  const [commentMessage, setCommentMessage] = useState('');

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

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {t('COMMENT_AS', { username: userData.username })}
      <TextEditor onChange={(msg) => setCommentMessage(msg)} />
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
