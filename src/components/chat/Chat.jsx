import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { chatActions } from '../../store/misc/chatStore';
import { removeHtmlTags } from '../../utils';
import IconButton from '../buttons/icon-button/IconButton';
import TextEditor from '../text-editor/TextEditor';
import styles from './Chat.module.css';
import ChatMessage from './chat-message/ChatMessage';

const secondUserId = '01HAAZ6FJDX5G5J4FCWM7AX2R8';
const baseURL = import.meta.env.VITE_API_KEY;

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.chats[secondUserId] ?? []);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const loggedUser = useSelector((state) => state.user);

  const socket = io(`${baseURL}/api/v1/messages`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // const [messages, setMessages] = useState([]);
  const [textEditorState, setTextEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const messagesRef = useRef(messages);
  const textEditorRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit('findAllMessagesByChatId', secondUserId, (response) => {
      console.log('findAllMessagesByChatId', response);
      dispatch(
        chatActions.setChat({
          userId: secondUserId,
          messages: response,
        })
      );
    });
  }, []);

  socket.on('message', (response) => {
    console.log('messages', messagesRef, response);
    dispatch(
      chatActions.addMessageToChat({ userId: secondUserId, message: response })
    );
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function sendMessage(html) {
    socket.emit(
      'createMessage',
      { secondUserId: secondUserId, text: html },
      (response) => {
        console.log('createMessage', response);
        dispatch(
          chatActions.addMessageToChat({
            userId: secondUserId,
            message: response,
          })
        );
      }
    );

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
            content={HTMLReactParser(`${msg.text}`)}
            isSender={msg.user.id === loggedUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </Card.Body>
      <Card.Footer className={styles.footer}>
        <TextEditor
          ref={textEditorRef}
          editorState={textEditorState}
          onEditorStateChange={setTextEditorState}
          editorClassName={styles['editor-class']}
          wrapperClassName={styles['wrapper-class']}
          toolbarHidden
          handleReturn={(e, newState) => {
            const html = convertToHTML(newState.getCurrentContent());

            if (!e.shiftKey && removeHtmlTags(html).trim() !== '') {
              sendMessage(html);
            }

            return !e.shiftKey;
          }}
        />
        <Button
          className={styles['submit-button']}
          onClick={() =>
            sendMessage(convertToHTML(textEditorState.getCurrentContent()))
          }
        >
          <AiOutlineSend style={{ fontSize: '25px' }} />
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Chat;
