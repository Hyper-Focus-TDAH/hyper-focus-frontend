import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { t } from '../../i18n/translate';
import { chatActions } from '../../store/misc/chatStore';
import { removeHtmlTags } from '../../utils';
import IconButton from '../buttons/icon-button/IconButton';
import TextEditor from '../text-editor/TextEditor';
import styles from './Chat.module.css';
import ChatMessage from './chat-message/ChatMessage';

const baseURL = import.meta.env.VITE_API_KEY;

function Chat({ selectedUser }) {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state) => state.chat.chats[selectedUser?.id] ?? []
  );
  const accessToken = useSelector((state) => state.auth.accessToken);
  const loggedUser = useSelector((state) => state.user);

  const socket = io(`${baseURL}/api/v1/messages`, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [textEditorState, setTextEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const textEditorRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.emit('joinChat', selectedUser.id);

    function onMessage(response) {
      dispatch(
        chatActions.addMessageToChat({
          userId: selectedUser?.id,
          message: response,
        })
      );
    }

    socket.emit('findAllMessagesByChatId', selectedUser?.id, (response) => {
      console.log(response);
      dispatch(
        chatActions.setChat({
          userId: selectedUser?.id,
          messages: response,
        })
      );
    });

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, []);

  function sendMessage(html) {
    console.log('send');
    socket.emit(
      'createMessage',
      { secondUserId: selectedUser?.id, text: html },
      (response) => {
        dispatch(
          chatActions.addMessageToChat({
            userId: selectedUser?.id,
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
        <span className={`${styles.title} h4`}>
          {t('CHAT_WITH_USERNAME', { username: selectedUser.username })}
        </span>
        <IconButton
          icon={<BsXLg size={22} />}
          onClick={() =>
            dispatch(
              chatActions.setIsOpen({ isOpen: false, selectedUser: null })
            )
          }
        />
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
