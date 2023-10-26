import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { t } from '../../i18n/translate';
import { formatChat } from '../../services/chatService';
import store from '../../store';
import { chatActions } from '../../store/misc/chatStore';
import { removeHtmlTags } from '../../utils';
import IconButton from '../buttons/icon-button/IconButton';
import TextEditor from '../text-editor/TextEditor';
import styles from './Chat.module.css';
import AuxiliarChatMessage from './auxiliar-chat-message/AuxiliarChatMessage';
import ChatMessage from './chat-message/ChatMessage';

const baseURL = import.meta.env.VITE_API_KEY;

function Chat({ selectedUser }) {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state) => state.chat.chats[selectedUser?.id] ?? []
  );
  const formattedMessages = formatChat(messages);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const loggedUser = useSelector((state) => state.user);

  const [textEditorState, setTextEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const textEditorRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [formattedMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    const socket = io(`${baseURL}/api/v1/messages`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    socket.emit('joinChat', selectedUser.id);

    if (!state.chat.chats[selectedUser.id]) {
      socket.emit('findAllMessagesByChatId', selectedUser?.id, (response) => {
        dispatch(
          chatActions.setChat({
            userId: selectedUser?.id,
            messages: response,
          })
        );
      });
    }

    function onMessage(response) {
      if (response.chat_id.includes(loggedUser.id)) {
        dispatch(
          chatActions.addMessageToChat({
            userId: selectedUser?.id,
            message: response,
          })
        );
      }
    }

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, []);

  function sendMessage(html) {
    const socket = io(`${baseURL}/api/v1/messages`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    socket.emit('joinChat', selectedUser.id);

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
        {formattedMessages.map((msg) => {
          if (msg.isAux) {
            return <AuxiliarChatMessage key={msg.id} date={msg.date} />;
          } else {
            return (
              <ChatMessage
                key={msg.id}
                text={msg.parsedText}
                time={msg.time}
                isSender={msg.user.id === loggedUser.id}
              />
            );
          }
        })}
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
