import { convertToHTML } from 'draft-convert';
import styles from './TextEditor.module.css';

import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

const toolbarOptions = {
  options: ['inline', 'history'],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough'],
    history: {
      options: ['undo', 'redo'],
    },
  },
};

function TextEditor({ onChange, editorState, onEditorStateChange }) {
  const [innerEditorState, setInnerEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState('');

  const _editorState = editorState ?? innerEditorState;

  function _onEditorStateChange(state) {
    const html = convertToHTML(_editorState.getCurrentContent());
    setConvertedContent(html);

    const parsedHtml = HTMLReactParser(html);

    if (!editorState) {
      setInnerEditorState(state);
    }

    if (onChange) {
      onChange(html);
    }

    if (onEditorStateChange) {
      onEditorStateChange(state);
    }
  }

  return (
    <div className={styles.editor}>
      <Editor
        editorState={_editorState}
        onEditorStateChange={_onEditorStateChange}
        wrapperClassName={styles['wrapper-class']}
        editorClassName={styles['editor-class']}
        toolbarClassName={styles['toolbar-class']}
        toolbar={toolbarOptions}
      />
    </div>
  );
}

export default TextEditor;
