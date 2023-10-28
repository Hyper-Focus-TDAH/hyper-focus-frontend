import { convertToHTML } from 'draft-convert';
import styles from './TextEditor.module.css';

import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import { forwardRef, useState } from 'react';
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

const TextEditor = forwardRef(
  (
    {
      onChange,
      editorState,
      onEditorStateChange,
      toolbarHidden,
      wrapperClassName,
      editorClassName,
      toolbarClassName,
      handleReturn,
      handleKeyCommand,
    },
    ref
  ) => {
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
      <Editor
        ref={ref}
        editorState={_editorState}
        onEditorStateChange={_onEditorStateChange}
        wrapperClassName={wrapperClassName ?? styles['wrapper-class']}
        editorClassName={editorClassName ?? styles['editor-class']}
        toolbarClassName={toolbarClassName ?? styles['toolbar-class']}
        toolbar={toolbarOptions}
        toolbarHidden={toolbarHidden}
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
      />
    );
  }
);
export default TextEditor;
