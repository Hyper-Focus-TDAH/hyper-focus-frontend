import { Card, Row } from 'react-bootstrap';
import styles from './ChatMessage.module.css';

function ChatMessage({ text, time, isSender }) {
  return (
    <Row className={`${styles.row} ${isSender ? styles['sender-row'] : ''}`}>
      <Card
        className={`${styles.message} ${
          isSender ? styles['sender-message'] : ''
        }`}
      >
        <div className={styles.content}>
          <div>{text}</div>
          <div className={styles.time}>{time}</div>
        </div>
      </Card>
    </Row>
  );
}

export default ChatMessage;
