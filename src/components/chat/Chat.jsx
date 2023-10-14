import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import moment from 'moment';
import { useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import IconButton from '../buttons/icon-button/IconButton';
import TextEditor from '../text-editor/TextEditor';
import styles from './Chat.module.css';
import ChatMessage from './chat-message/ChatMessage';

const mockMessages = [
  {
    id: '1',
    content: 'oi amigo',
    user: {
      id: '01HAAZ5X5PSN3QK93GBP6X20XN',
    },
  },
  {
    id: '2',
    content: 'oi oi',
    user: {
      id: '',
    },
  },
];

function Chat() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([...mockMessages]);
  const loggedUser = useSelector((state) => state.user);
  const textEditorRef = useRef(null);
  const [textEditorState, setTextEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function sendMessage() {
    const newMessages = [
      ...messages,
      { id: moment.now().toString(), content: text, user: loggedUser },
    ];

    setMessages(newMessages);

    setText('');
    setTextEditorState(EditorState.createEmpty());
  }

  return (
    <Card className={styles.container}>
      <Card.Header className={styles.header}>
        <span className="h4 mb-0">Chat</span>
        {loggedUser.id}
        <IconButton icon={<BsXLg size={22} />} />
      </Card.Header>
      <Card.Body className={styles.body}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            content={HTMLReactParser(msg.content)}
            isSender={msg.user.id === loggedUser.id}
          />
        ))}
      </Card.Body>
      <Card.Footer className={styles.footer}>
        <TextEditor
          ref={textEditorRef}
          editorState={textEditorState}
          onEditorStateChange={setTextEditorState}
          onChange={setText}
          toolbarHidden
          editorClassName={styles['editor-class']}
          wrapperClassName={styles['wrapper-class']}
          handleReturn={(e) => {
            if (!e.shiftKey && text.trim() !== '') {
              sendMessage();
            }
            return !e.shiftKey;
          }}
        />
        <Button className={styles['submit-button']} onClick={sendMessage}>
          <AiOutlineSend style={{ fontSize: '25px' }} />
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Chat;
