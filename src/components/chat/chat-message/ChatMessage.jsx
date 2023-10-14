import { Card, Row } from 'react-bootstrap';
import styles from './ChatMessage.module.css';

function ChatMessage({ content, isSender }) {
  return (
    <Row className={`${styles.row} ${isSender ? styles['sender-row'] : ''}`}>
      <Card
        className={`${styles.message} ${
          isSender ? styles['sender-message'] : ''
        }`}
      >
        {content}
      </Card>
    </Row>
  );
}

export default ChatMessage;
