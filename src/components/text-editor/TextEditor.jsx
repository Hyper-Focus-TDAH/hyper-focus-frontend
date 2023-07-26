import { convertToHTML } from 'draft-convert';
import styles from './TextEditor.module.css';

import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

function TextEditor({ onChange }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState('');

  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    const parsedHtml = HTMLReactParser(html);
    onChange && onChange(parsedHtml);
  }, [editorState]);

  return (
    <div className={styles.editor}>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={styles['wrapper-class']}
        editorClassName={styles['editor-class']}
        toolbarClassName={styles['toolbar-class']}
      />
    </div>
  );
}

export default TextEditor;
